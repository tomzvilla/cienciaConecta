// hooks
import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

// components
import ProjectCard from "../../components/Projects/ProjectCard"
import Spinner from "../../components/Spinner/Spinner"

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
        category = categoriesData.categoria.find((category) => category._id === data.proyectos.categoria)
        level = levelsData.nivel.find((level) => level._id === data.proyectos.nivel)

        project = {
            ...data.proyectos, 
            categoria: category.nombre,
            nivel: level.nombre, 
        }
    }

    return (
        <div>
            <h1> Feria de Ciencia y Tecnologia 2024</h1>
            {!data ? <Spinner/> : <ProjectCard formData={project}/>}
        </div>
    )
}

export default VisualizarProyecto