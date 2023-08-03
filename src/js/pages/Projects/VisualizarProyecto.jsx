// hooks
import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

// components
import ProjectCard from "../../components/Projects/ProjectCard"
import Navbar from "../../components/Navbar/Navbar"
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
    console.log(data)

    


    if(categoriesData && levelsData && data) {
        const proyectos = data.proyecto
        category = categoriesData.categoria.find((category) => category._id === proyectos.categoria)
        level = levelsData.nivel.find((level) => level._id === proyectos.nivel)

        project = {
            ...proyectos, 
            categoria: category.nombre,
            nivel: level.nombre, 
        }
    }

    return (
        <div>
            {/* <Navbar/> */}
            <h1> Feria de Ciencia y Tecnologia 2024</h1>
            {!data ? <Spinner/> : <ProjectCard formData={project}/>}
        </div>
    )
}

export default VisualizarProyecto