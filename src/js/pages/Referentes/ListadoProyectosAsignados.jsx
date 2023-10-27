// components
import TablaProyectosReferente from "../../components/TablaProyectosReferente/TablaProyectosReferente"
import Spinner from "../../components/Spinner/Spinner"
import Card from "../../components/Card/Card"
import BlankState from "../../components/BlankState/BlankState"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { useDispatch } from "react-redux"
import { referentesActions } from "../../../store/referentes-slice"
import CardHeader from "../../components/Card/CardHeader"

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
        console.log(proyectosData?.proyectos)
        dispatch(referentesActions.cargarProyectosReferente(proyectos))
    }

    if(!isLoading) console.log(proyectosData)


    return (
        isLoading && !proyectosData?.proyectos ?
        <Spinner />
        :
        <Card wide={true} header={<CardHeader title={'Listado de proyectos asignados'} wide={true} goBack={true}/>}>
            {status !== 204 ?
                <TablaProyectosReferente headers={headers} />
                :
                <BlankState msg={'Actualmente no posee proyectos asignados.'}/>
            }
        </Card>
    )

}

export default ListadoProyectosAsignados