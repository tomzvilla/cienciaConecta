// components
import TablaProyectosReferente from "../../components/TablaProyectosReferente/TablaProyectosReferente"
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
import CardHeader from "../../components/Card/CardHeader"

const headers = [
    {name: 'Título' , value: 'titulo'},
    {name: 'Nivel' , value: 'nivel'},
    {name: 'Categoría' , value: 'categoria'},]
    
const ListadoProyectosAsignados = () => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    
    const niveles = useSelector(state => state.niveles.niveles)
    const categorias = useSelector(state => state.categorias.categorias)

    const { data: proyectosData, isLoading, status } = useAxiosFetch(`/referente/proyectos`, axiosPrivate)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate, categorias.length !== 0)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, niveles.length !== 0)

    const { proyectosMapping } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading, categoriasCargadas: categorias, nivelesCargados: niveles })

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

        <Card wide={true} header={<CardHeader title={'Listado de proyectos asignados'} wide={true} />}>
            {status !== 204 ?
                <TablaProyectosReferente headers={headers} />
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