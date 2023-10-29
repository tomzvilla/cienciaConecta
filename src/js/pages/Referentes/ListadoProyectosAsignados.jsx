// components
import TablaProyectosReferente from "../../components/TablaProyectosReferente/TablaProyectosReferente"
import TablaProyectosAsignadosHeader from "../../components/TablaProyectosReferente/TablaProyectosAsignadosHeader"
import Spinner from "../../components/Spinner/Spinner"
import Card from "../../components/Card/Card"
import BlankState from "../../components/BlankState/BlankState"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import useUtils from "../../hooks/useUtils"
import { useDispatch, useSelector } from "react-redux"
import { referentesActions } from "../../../store/referentes-slice"

const headers = [
    {name: 'Título' , value: 'titulo'},
    {name: 'Nivel' , value: 'nivel'},
    {name: 'Categoría' , value: 'categoria'},
]

const ListadoProyectosAsignados = () => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const { data: proyectosData, isLoading, status } = useAxiosFetch(`/referente/proyectos`, axiosPrivate)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)

    const { proyectosMapping } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading })

    if(!isLoading && proyectosData?.proyectos) {
        const proyectos = proyectosMapping(proyectosData?.proyectos)
        dispatch(referentesActions.cargarProyectosReferente(proyectos))
    }

    const { formatDate } = useUtils()
    const feria = useSelector(state => state.instancias.feria)
    const fecha = new Date()


    return (
        isLoading && !proyectosData?.proyectos ?
        <Spinner />
        :
        <Card wide={true} header={<TablaProyectosAsignadosHeader title={'Listado de proyectos asignados'} wide={true}/>}>
            {   fecha >= new Date(feria?.fechas_evaluador.fechaInicioAsignacionProyectos) && fecha <= new Date(feria?.fechas_evaluador.fechaFinAsignacionProyectos) ?
                <>
                    {status !== 204 ?
                    <TablaProyectosReferente headers={headers} />
                    :
                    <BlankState msg={'Actualmente no posee proyectos asignados.'}/>}
                </>
                :
                fecha <= new Date(feria?.fechas_evaluador.fechaInicioAsignacionProyectos) ?
                <BlankState msg={`La fecha de asignación de proyectos aún no llegó, por favor esperá hasta el ${formatDate(new Date(feria?.fechas_evaluador.fechaInicioAsignacionProyectos))}`}/>
                :
                <BlankState msg={'La fecha de asignación de proyectos expiró. Ahora los evaluadores podrán realizar la evaluación de los proyectos.'}/>
            }
        </Card>
    )

}

export default ListadoProyectosAsignados