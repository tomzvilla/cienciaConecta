// hooks
import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

// components
import ProjectCard from "../../components/Projects/ProjectCard"
import Spinner from "../../components/Spinner/Spinner"
import Metadata from "../../components/Metadata/Metadata"
import capitalizeEachLetter from "../../utils/utils"

const VisualizarProyecto = () => {
    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { data } = useAxiosFetch(`/proyecto/${id}`, axiosPrivate)
    const { data: categoriesData} = useAxiosFetch('/categoria', axiosPrivate)
    const { data: levelsData} = useAxiosFetch('/nivel', axiosPrivate)

    let category = {
        nombre: ''
    }
    let level = {
        nombre: ''
    }
    let project = {}

    if(categoriesData && levelsData && data) {
        category = categoriesData.categoria.find((category) => category._id === data.proyecto.categoria)
        level = levelsData.nivel.find((level) => level._id === data.proyecto.nivel)

        project = {
            ...data.proyecto, 
            nombreEscuela: capitalizeEachLetter(data.proyecto.establecimientoEducativo.nombre),
            categoria: category.nombre,
            nivel: level.nombre, 
        }
    }

    return (
        <>
            <Metadata title={'Proyecto'}/>
            {!data ? <Spinner/> : <ProjectCard formData={project} goBack={'/misProyectos'}/>}
        </>
    )
}

export default VisualizarProyecto