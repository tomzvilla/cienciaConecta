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
import { useDispatch, useSelector } from "react-redux"
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
    const nivelesState = useSelector(state => state.niveles.niveles)
    const categoriasState = useSelector(state => state.categorias.categorias)

    const { data: sedesData, isLoading: loadingSedes } = useAxiosFetch(`/establecimiento/sedes/regional`, axiosPrivate)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate, categoriasState.length !== 0)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, nivelesState.length !== 0)

    const { niveles: nivelesMapeados, categorias: categoriasMapeadas, sedes, proyectosMapping } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, sedesData: sedesData, enabled: !loadingCategorias && !loadingNiveles && !loadingSedes, categoriasCargadas: categoriasState, nivelesCargados: nivelesState })
    
    let niveles = nivelesState.length !== 0 ? [{_id: 0, nombre: "", codigo: '0'}, ...nivelesState] : nivelesMapeados
    let categorias = categoriasState.length !== 0 ? [{_id: 0, nombre: ""}, ...categoriasState] : categoriasMapeadas

    useEffect(() => {
        buscarProyectos(searchState.sedeSeleccionada, searchState.nivelSeleccionado)

    }, [searchState])

    const buscarProyectos = async (sede, nivel) => {
        if(!sede || !nivel) return
        try {
            setBuscaronProyectos(true)
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

    const loading = (niveles.length !== 0 && categorias.length !== 0) ? false : (loadingCategorias || loadingNiveles)

    return (
        <Card wide={true} title={'Promover proyectos a instancia provincial'}> 
            {
                ( loading || loadingSedes ) ?
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