// components
import Spinner from "../../components/Spinner/Spinner"
import BlankState from "../../components/BlankState/BlankState"
import TablaEvaluaciones from "../../components/Evaluacion/TablaEvaluaciones"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"

import { evaluacionActions } from "../../../store/evaluacion-slice";
import { useDispatch } from "react-redux";

const headers = [
    {name: 'Título', value: 'titulo'},
    {name: 'Nivel', value: 'nivel'},
    {name: 'Categoría', value: 'categoria'},
    {name: 'Estado', value: 'estado'},
]


const ListadoEvaluaciones = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()

    const { data: listadoData, isLoading } = useAxiosFetch('/evaluacion/pendientes', axiosPrivate)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)

    const { proyectosMapping } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading })


    if(!isLoading && listadoData?.proyectos) {
        const proyectos = proyectosMapping(listadoData?.proyectos)
        dispatch(evaluacionActions.cargarTablaEvaluacionesPendientes(proyectos))
    }

    return (
        isLoading ? 
        <Spinner /> 
        :
        listadoData?.length === 0 ?
        < BlankState msg='No hay proyectos pendientes de evaluacion' />
        :
        <TablaEvaluaciones headers={headers} />
    )

}

export default ListadoEvaluaciones