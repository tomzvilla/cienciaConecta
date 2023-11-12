import { useParams } from "react-router-dom";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Spinner from "../../components/Spinner/Spinner";
import ConfirmacionCuenta from "../../components/Usuarios/ConfirmacionCuenta";

 const ConfirmarCuenta = () => {
    const {token} = useParams()
    const axiosPrivate = useAxiosPrivate()
    const { isLoading, status } = useAxiosFetch(`/auth/confirmar/${token}`, axiosPrivate)

    let errorStatus = true

    if (!isLoading) {
        errorStatus = status === 200 ? false : true
    }

    return (
        <div>
            {   
                isLoading ? 
                <Spinner /> :
                <ConfirmacionCuenta error={errorStatus}/>
            }
        </div>
    );
 }

 export default ConfirmarCuenta;