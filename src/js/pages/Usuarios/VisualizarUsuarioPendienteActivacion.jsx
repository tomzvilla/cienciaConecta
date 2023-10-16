import { useParams } from "react-router"
import Card from "../../components/Card/Card"
import Spinner from "../../components/Spinner/Spinner"
import { useDispatch, useSelector } from "react-redux"
import PostulanteHeader from "../../components/Card/PostulanteHeader"
import DatosUsuario from "../../components/Usuarios/DatosUsuario"
import Swal from "sweetalert2"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { pendientesActions } from "../../../store/pendiente-slice"
import { useLocation, useNavigate } from "react-router-dom";

const VisualizarUsuarioPendienteActivacion = () => {
    const show = true
    const location = useLocation()
    const navigate = useNavigate()

    const data = useSelector(state => state.pendientes.listadoPendientes)
    const { id } = useParams()
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()
    const usuario = data.find(user => user._id === id)

    const seleccionarPendientes = async () => {
        try {
            const response = await axiosPrivate.post(`/auth/alta`,
   
                JSON.stringify({usuarios: [usuario._id]}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
            if(response.status === 200) return true

        } catch (err) {
            let msg = ''
            if(!err?.response){
                msg = 'El servidor no respondió'
            } else if(err.response?.status === 403) {
                msg = 'El usuario ya esta activado'
            } else if(err.response?.status === 401) {
                msg = 'No existe el usuario.'
            } else {
                msg = `Falló la activacion de la cuenta <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la activacion de la cuenta',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }
    }


    const handleActivar = () => {

        Swal.fire({
            title: '¿Deseas activar a este usuario?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await seleccionarPendientes()
                if(success) Swal.fire({
                    title: '¡Usuario activado!',
                    text: 'Se enviará un email a los usuarios notificando sobre la activación de su cuenta',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
                        dispatch(pendientesActions.actualizarUsuariosPendientes([usuario._id]))
                        navigate(location.state?.from || '/dashboard', {replace: true, state: {from:'/activarUsuario/:id'}})
    
                    }
                })
            }
        })
    }



    return (
        <Card title="Visualizar Usuario" header={<PostulanteHeader title={usuario? usuario.nombre:""} subtitle={usuario?usuario.cuil :""}/>}>
            <div>
                    <DatosUsuario
                        cargo={usuario? usuario.datos_docente.cargo:""} 
                        telefono={usuario? usuario.datos_docente.telefono:""}
                        email={usuario? usuario.email :""} 
                        onClick={handleActivar}
                    />
            </div>
        </Card> 
    )
}


export default VisualizarUsuarioPendienteActivacion;




