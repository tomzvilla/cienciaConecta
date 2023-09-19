// components
import Spinner from "../../components/Spinner/Spinner"
import EvaluacionForm from "../../components/Evaluacion/EvaluacionForm"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

const projectId = '650629af81d643566c1c5c98'

const Evaluacion = () => {

    const axiosPrivate = useAxiosPrivate()
    const {data: evaluacionData, isLoading } = useAxiosFetch(`/evaluacion/${projectId}`, axiosPrivate)
    if(evaluacionData) {
        console.log(evaluacionData)
    }

    return (
        isLoading ? <Spinner/> : <EvaluacionForm evaluacion={evaluacionData} />
    )

}


export default Evaluacion