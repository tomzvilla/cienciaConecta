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

const PromoverProyectosNacional = () => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()

    const [searchState, setSearchState] = useState({
        nivelSeleccionado: '',
    })

    const [categoria, setCategoria] = useState(null)
    const nivelesState = useSelector(state => state.niveles.niveles)
    const categoriasState = useSelector(state => state.categorias.categorias)

    const [buscaronProyectos, setBuscaronProyectos] = useState(false)

    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate, categoriasState.length !== 0)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, nivelesState.length !== 0)

    const { niveles: nivelesMapeados, categorias: categoriasMapeadas, proyectosMapping } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles, categoriasCargadas: categoriasState, nivelesCargados: nivelesState })
    
    let niveles = nivelesState.length !== 0 ? [{_id: 0, nombre: "", codigo: '0'}, ...nivelesState] : nivelesMapeados
    let categorias = categoriasState.length !== 0 ? [{_id: 0, nombre: ""}, ...categoriasState] : categoriasMapeadas

    useEffect(() => {
        buscarProyectos(searchState.nivelSeleccionado)

    }, [searchState])

    const buscarProyectos = async (nivel) => {
        if(!nivel) return
        try {
            dispatch(promocionesActions.setLoadingProyectos(true))
            const res = await axiosPrivate.post('/promocion/nacional/proyectos', JSON.stringify({
                nivel: nivel,
            }))
            dispatch(promocionesActions.setCupos({
                cuposNivel: res.data.cuposNivel,
                promovidosNivel: res.data.promovidosNivel,
            }))
            let proyectos = res.status === 204 ? [] : res.data.proyectos
            if(proyectos.length > 0) {
                proyectos = proyectosMapping(proyectos)
                proyectos = proyectos.map(p => {
                    return {
                        ...p,
                        puntajeFinal: p.exposicion.puntajeExposicion

                    }})
            }
            dispatch(promocionesActions.setSelectedRows([]))
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
        <Card wide={true} title={'Promover proyectos a instancia nacional'}> 
            {
                loadingCategorias || loadingNiveles ?
                <Spinner />
                :
                <>
                    <FiltroPromoverProyectos
                        categorias={categorias}
                        niveles={niveles}
                        handleChange={handleChange}
                    />
                    {!buscaronProyectos ?
                    <BlankState msg={'Ingrese un nivel para buscar proyectos'} />
                    :
                    <TablaPromoverProyectos
                        headers={headers}
                        nivel={searchState.nivelSeleccionado}
                        categoria={categoria}
                        nacional={true}
                        viewPath={'/evaluacion'}
                    />
                    }
                </>
            }
        </Card>
        
    )
}

export default PromoverProyectosNacional