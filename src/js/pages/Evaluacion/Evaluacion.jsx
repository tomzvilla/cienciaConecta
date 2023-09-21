// components
import Spinner from "../../components/Spinner/Spinner"
import EvaluacionForm from "../../components/Evaluacion/EvaluacionForm"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

const projectId = '650629af81d643566c1c5c98'

const Evaluacion = () => {

    const axiosPrivate = useAxiosPrivate()
    
    const {data: evaluacionStructure, isLoading, errors, status} = useAxiosFetch(`/evaluacion/consultar/${projectId}`, axiosPrivate)
    if(!isLoading){
        // TODO manejar caso en que ya se este evaluando el proyecto

    }

    return (
        isLoading && !evaluacionStructure ? <Spinner/> : <EvaluacionForm projectId={projectId} evaluacion={evaluacionStructure} />
    )

}


export default Evaluacion