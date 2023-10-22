// components
import Spinner from "../../components/Spinner/Spinner"
import BlankState from "../../components/BlankState/BlankState"
import Card from "../../components/Card/Card"
import TablaEvaluaciones from "../../components/Evaluacion/TablaEvaluaciones"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { evaluacionActions } from "../../../store/evaluacion-slice";
import { instanciasActions } from "../../../store/instancias-slice"
import { useDispatch } from "react-redux";
import { useLocation } from "react-router"

const headers = [
    {name: 'Título', value: 'titulo'},
    {name: 'Nivel', value: 'nivel'},
    {name: 'Categoría', value: 'categoria'},
    {name: 'Estado', value: 'nombreEstado'},
]


const ListadoEvaluaciones = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const location = useLocation()

    // TO DO, agregar consulta a endpoint de estado feria, o agregarlo en el jwt
    const instancia = 'regional'
    dispatch(instanciasActions.setInstancia('regional'))
    const { data: listadoData, isLoading } = useAxiosFetch('/evaluacion/pendientes', axiosPrivate)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)

    const { proyectosMapping } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading })


    if(!isLoading && listadoData?.proyectos) {
        let proyectosFiltrados = []
        if(instancia === 'regional') {
            proyectosFiltrados = listadoData?.proyectos.filter(p => parseInt(p.estado) < 3)
        } else {
            proyectosFiltrados = listadoData?.proyectos.filter(p => parseInt(p.estado) >= 3)
        }
        const proyectos = proyectosMapping(proyectosFiltrados)
        dispatch(evaluacionActions.cargarTablaEvaluacionesPendientes(proyectos))
    }


    return (
        <div className="table-custom-page">
            <Card title={`Listado de ${instancia === 'regional' ? 'Evaluaciones' : 'Exposiciones'}`} wide={true}>
                    {isLoading ? 
                        <Spinner /> 
                        :
                        listadoData?.length === 0 ?
                        < BlankState msg={`No hay ${instancia === 'regional' ? 'proyectos' : 'exposiciones'} pendientes de evaluación. ¡Intentá de nuevo mas tarde!`} />
                        :
                        <TablaEvaluaciones location={location} headers={headers}/>
                    }
            </Card>
        </div>
    )

}

export default ListadoEvaluaciones;