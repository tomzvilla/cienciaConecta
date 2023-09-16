import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import Swal from "sweetalert2";

const AuthVerify = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const logout = useLogout()
    console.log('Entro al auth verify')
    useEffect(() => {
        const expiration = localStorage.getItem("refreshExpiresIn");

        if (expiration) {
            if(location.pathname === '/home' || location.pathname === '/login') return
            if (new Date(expiration) < new Date()) {
                Swal.fire({
                    title: 'La sesion expiró',
                    text: 'Por favor, inica sesión nuevamente',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
                        logout()
                        navigate('/home',{replace: true})
                    }
                })
            }
        }
    }, [location, props]);

  return 
}


export default AuthVerify