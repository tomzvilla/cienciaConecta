// components
import Spinner from "../../components/Spinner/Spinner"
import EvaluacionForm from "../../components/Evaluacion/EvaluacionForm"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"

const Evaluacion = () => {
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state?.from || `/dashboard`
    
    const {data: evaluacionStructure, isLoading} = useAxiosFetch(`/evaluacion/consultar/${id}`, axiosPrivate)
    const {data: iniciarEvaluacion, isLoading: isLoadingEvaluacion, status  } = useAxiosFetch(`/evaluacion/${id}`, axiosPrivate)
    if(!isLoading && !isLoadingEvaluacion){
        // TODO manejar caso en que ya se este evaluando el proyecto
        if(!iniciarEvaluacion) {
            Swal.fire({
                title: '¡Alerta!',
                text: 'Otro evaluador se encuentra evaluando estre proyecto. Porfavor, esperá a que termine.',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            }).then((result) => {
                if(result.isConfirmed || result.isDismissed) {
                    navigate(from, {replace: true, state: {from:`${location.pathname}`}})
                }
            })
        }

    }

    return (
        (isLoading || isLoadingEvaluacion || !evaluacionStructure || !iniciarEvaluacion ) ? 
        <Spinner/>
        :
        <EvaluacionForm projectId={id} evaluacion={iniciarEvaluacion} initStatus={status} />
    )

}


export default Evaluacion