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

    const { data: listadoData, isLoading } = useAxiosFetch('/evaluacion/pendientes', axiosPrivate)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)

    const { proyectosMapping } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading })


    if(!isLoading && listadoData?.proyectos) {
        
        const proyectos = proyectosMapping(listadoData?.proyectos)
        dispatch(evaluacionActions.cargarTablaEvaluacionesPendientes(proyectos))
    }

    return (
        <div className="table-custom-page">
            <Card title="Listado de Evaluaciones" wide={true}>
                
                    {/* <h6 className="table-custom-page__text">Proyectos pendientes de evaluación</h6> */}

                    {isLoading ? 
                        <Spinner /> 
                        :
                        listadoData?.length === 0 ?
                        < BlankState msg='No hay proyectos pendientes de evaluación. ¡Intentá de nuevo mas tarde!' />
                        :
                        <TablaEvaluaciones location={location} headers={headers} />
                    }
            </Card>
        </div>
    )

}

export default ListadoEvaluaciones;