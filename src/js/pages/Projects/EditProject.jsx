// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useParams } from "react-router-dom"

// components
import EditSchoolStageForm from "../../components/Projects/EditSchoolStageForm"

const EditProject = () => {
    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { data } = useAxiosFetch(`/proyecto/${id}`, axiosPrivate)
    if(data){
        console.log(data)
    }

    return (
        <div>
            {!data ? <p>Cargando...</p> : <EditSchoolStageForm formData={data.proyecto}/>}
        </div>
    )

}

export default EditProject