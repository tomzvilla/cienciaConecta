// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useParams } from "react-router-dom"

// components
import ActualizarEtapaEscolarForm from "../../components/Projects/ActualizarEtapaEscolarForm"

const ActualizarProyecto = () => {
    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { data } = useAxiosFetch(`/proyecto/${id}`, axiosPrivate)
    if(data){
        console.log('hay datos')
        console.log(data)
    }

    return (
        <div>
            {!data ? <p>Cargando...</p> : <ActualizarEtapaEscolarForm formData={data.proyectos}/>}
        </div>
    )

}

export default ActualizarProyecto