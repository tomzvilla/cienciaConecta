// components
import Card from "../components/Card/Card"
import Spinner from "../components/Spinner/Spinner"
import PostulanteHeader from "../components/Card/PostulanteHeader"
import DatosUsuario from "../components/Usuarios/DatosUsuario"
import FormEditarPerfil from "../components/Usuarios/FormEditarPerfil"
// hooks
import { useState, useEffect } from "react"
import useAxiosFetch from "../hooks/useAxiosFetch"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useUtils from "../hooks/useUtils"
import { useDispatch, useSelector } from "react-redux"
import { perfilActions } from "../../store/perfil-slice"

const Profile = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const [editando, setEditando] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const { formatCuil } = useUtils()

    let usuario = useSelector(state => state.perfil.usuario) ?? {}

    useEffect(() => {

        const cargarUsuario = async () => {
            // TODO, cambiar endpoint para cuando este
            const res = await axiosPrivate.get('/usuario')
            const usuario = res.data.usuario
            setIsLoading(false)
            dispatch(perfilActions.setUsuario(usuario))
            
        }

        cargarUsuario()

    }, [editando])

    const handleEditar = () => {
        setEditando(true)
    }

    const title = isLoading ? 'Cargando...' : !editando ? usuario?.nombre + ' ' + usuario?.apellido : 'Mis Datos'
    const subtitle = isLoading ? 'Cargando...' : !editando ? formatCuil(usuario?.cuil) : null


    return (
        <Card title="Visualizar Postulante" header={<PostulanteHeader title={title} subtitle={subtitle} onClick={editando ? () => setEditando(false) : null}/>}>
            {isLoading  ?
                <Spinner/> 
                :
                !editando ?
                <DatosUsuario
                    cargo={usuario.cargo} 
                    telefono={usuario.telefono}
                    email={usuario.usuario.email}
                    password={'***********'}
                    onClick={handleEditar}
                    editar={true}
                />
                :
                <FormEditarPerfil usuario={usuario} setEditando={setEditando}/>
            }
        </Card>  
    )

}

export default Profile