// components
import Spinner from "../../components/Spinner/Spinner"
import BlankState from "../../components/BlankState/BlankState"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

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
    if(!isLoading) {
        dispatch(evaluacionActions.cargarTablaEvaluacionesPendientes(listadoData?.proyectos))
    }

    return (
        isLoading ? 
        <Spinner /> 
        :
        listadoData?.length === 0 ?
        < BlankState msg='No hay proyectos pendientes de evaluacion' />
        :
        <div>
            Listado de Evaluaciones
        </div>
    )

}

export default ListadoEvaluaciones