// components
import Spinner from "../../components/Spinner/Spinner"
import AsignarEvaluadores from "../../components/AsignarEvaluadores/AsignarEvaluadores"

// hooks
import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { referentesActions } from "../../../store/referentes-slice"

const ProyectoAsignarEvaluadores = () => {

    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()


    let proyecto = useSelector(state => state.referentes.proyectosReferente)?.find(p => p._id === id)
    if(proyecto) {
        dispatch(referentesActions.cargarProyectoEditando(proyecto))
    }
    // Si recarga la pagina se hacen estas consultas
    const { data: proyectoData, isLoading } = useAxiosFetch(`/proyecto/${id}`, axiosPrivate, !!proyecto)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)
    const { data: evaluadoresData, isLoading: loadingEvaluadores } = useAxiosFetch(`/referente/evaluadores/${id}`, axiosPrivate)

    const { evaluadorMapping, proyectoMap } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && (!loadingEvaluadores || !isLoading) })
    
    if(!isLoading && proyectoData?.proyecto) {
        proyecto = proyectoMap(proyectoData)
        dispatch(referentesActions.cargarProyectoEditando(proyecto))
    }
    let evaluadores = []
    if(!loadingEvaluadores && evaluadoresData && proyecto) {
        evaluadores = evaluadorMapping(evaluadoresData.evaluadores).sort((a, b) => b.coincidencia - a.coincidencia).map(ev => {
            const isAsigned = proyecto.evaluadoresRegionales.some(e => e === ev._id)
            return {
                ...ev,
                asignado: isAsigned
            }
        })
        dispatch(referentesActions.cargarEvaluadores(evaluadores))
    }


    return (
        (!proyecto || loadingEvaluadores) ?
        <Spinner />
        :
        <AsignarEvaluadores evaluadores={evaluadores} />
    )
}

export default ProyectoAsignarEvaluadores