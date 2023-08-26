// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useParams } from "react-router-dom"

// components
import ActualizarProyectoForm from "../../components/Projects/ActualizarProyectoForm"
import Spinner from "../../components/Spinner/Spinner"

const ActualizarProyecto = () => {
    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { data } = useAxiosFetch(`/proyecto/${id}`, axiosPrivate)


    return (
        <>
            {!data ? <Spinner/> : <ActualizarProyectoForm formData={data.proyecto}/>}
        </>
    )

}

export default ActualizarProyecto