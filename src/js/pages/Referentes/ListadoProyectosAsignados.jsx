// components
import TablaProyectosReferente from "../../components/TablaProyectosReferente/TablaProyectosReferente"
import TablaProyectosAsignadosHeader from "../../components/TablaProyectosReferente/TablaProyectosAsignadosHeader"
import Spinner from "../../components/Spinner/Spinner"
import Card from "../../components/Card/Card"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { useDispatch } from "react-redux"
import { referentesActions } from "../../../store/referentes-slice"

const headers = [
    {name: 'Título' , value: 'titulo'},
    {name: 'Nivel' , value: 'nivel'},
    {name: 'Categoría' , value: 'categoria'},
]

const ListadoProyectosAsignados = () => {
    
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const { data: proyectosData, isLoading } = useAxiosFetch(`/referente/proyectos`, axiosPrivate)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)

    const { proyectosMapping } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading })

    if(!isLoading && proyectosData?.proyectos) {
        const proyectos = proyectosMapping(proyectosData?.proyectos)
        dispatch(referentesActions.cargarProyectosReferente(proyectos))
    }


    return (
        isLoading && !proyectosData?.proyectos ?
        <Spinner />
        :
        <Card wide={true} header={<TablaProyectosAsignadosHeader title={'Listado de proyectos asignados'} wide={true}/>}>
            <TablaProyectosReferente headers={headers} />
        </Card>
        
    )

}

export default ListadoProyectosAsignados