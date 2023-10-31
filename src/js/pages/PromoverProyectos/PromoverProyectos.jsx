// components
import FiltroPromoverProyectos from "../../components/PromoverProyectos/FiltroPromoverProyectos"
import Spinner from "../../components/Spinner/Spinner"
import Card from "../../components/Card/Card"
import TablaPromoverProyectos from "../../components/PromoverProyectos/TablaPromoverProyectos"
import BlankState from "../../components/BlankState/BlankState"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { promocionesActions } from "../../../store/promocion-slice"

const headers = [
    {name: 'Titulo', value: 'titulo'},
    {name: 'Categoría', value: 'categoria'},
    {name: 'Nivel', value: 'nivel'},
    {name: 'Puntaje', value: 'puntajeFinal'},
]

const PromoverProyectos = () => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()

    const [searchState, setSearchState] = useState({
        sedeSeleccionada: '',
        nivelSeleccionado: '',
    })

    const [categoria, setCategoria] = useState(null)

    const [buscaronProyectos, setBuscaronProyectos] = useState(false)

    const { data: sedesData, isLoading: loadingSedes } = useAxiosFetch(`/establecimiento/sedes/regional`, axiosPrivate)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)

    const { niveles, categorias, sedes, proyectosMapping } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, sedesData: sedesData, enabled: !loadingCategorias && !loadingNiveles && !loadingSedes })
    
    useEffect(() => {
        buscarProyectos(searchState.sedeSeleccionada, searchState.nivelSeleccionado)

    }, [searchState])

    const buscarProyectos = async (sede, nivel) => {
        if(!sede || !nivel) return
        try {
            dispatch(promocionesActions.setLoadingProyectos(true))
            const res = await axiosPrivate.post('/promocion/provincial/proyectos', JSON.stringify({
                nivel: nivel,
                sede: sede,
            }))
            dispatch(promocionesActions.setCupos({cupos: res.data.cupos}))
            let proyectos = res.status === 204 ? [] : res.data.proyectos
            if(proyectos.length > 0) {
                proyectos = proyectosMapping(proyectos)
                proyectos = proyectos.map(p => {
                    return {
                        ...p,
                        puntajeFinal: p.exposicion.puntajeFinal

                    }})
            }
            dispatch(promocionesActions.setLoadingProyectos(false))
            dispatch(promocionesActions.cargarProyectos(proyectos))
            setBuscaronProyectos(true)
        } catch (err) {
            console.log(err)
        }

    }

    const handleChange = (e) => {
        const {name, value} = e.target
        if(name === 'categoria') {
            setCategoria(value)
            return
        }
        const nextFormValueState = {
            ...searchState,
            [name]: value
        }
        setSearchState(nextFormValueState)

    }

    return (
        <Card wide={true} title={'Promover proyectos a instancia provincial'}> 
            {
                loadingCategorias || loadingNiveles || loadingSedes ?
                <Spinner />
                :
                <>
                    <FiltroPromoverProyectos
                        sedes={sedes}
                        categorias={categorias}
                        niveles={niveles}
                        handleChange={handleChange}
                    />
                    {!buscaronProyectos ?
                    <BlankState msg={'Ingrese una sede y un nivel para buscar proyectos'} />
                    :
                    <TablaPromoverProyectos
                        headers={headers}
                        nivel={searchState.nivelSeleccionado}
                        sede={searchState.sedeSeleccionada}
                        categoria={categoria}
                        nacional={false}
                        viewPath={'/evaluacion'}
                    />
                    }
                </>
            }
        </Card>
        
    )
}

export default PromoverProyectos