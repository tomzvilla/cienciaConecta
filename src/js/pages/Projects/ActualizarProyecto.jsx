// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useParams } from "react-router-dom"

// components
import ActualizarProyectoForm from "../../components/Projects/ActualizarProyectoForm"

const ActualizarProyecto = () => {
    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { data } = useAxiosFetch(`/proyecto/${id}`, axiosPrivate)

    return (
        <div>
            {!data ? <p>Cargando...</p> : <ActualizarProyectoForm formData={data.proyectos}/>}
        </div>
    )

}

export default ActualizarProyecto