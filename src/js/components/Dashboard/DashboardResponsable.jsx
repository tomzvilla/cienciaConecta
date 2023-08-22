// components
import ProjectCard from "../Projects/ProjectCard"
import Spinner from "../Spinner/Spinner"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

const DashboardResponsable = () => {
    const axiosPrivate = useAxiosPrivate()

    const {data} = useAxiosFetch('/proyecto/misProyectos', axiosPrivate)
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
        category = categoriesData.categoria.find((category) => category._id === data.proyectos[0].categoria)
        level = levelsData.nivel.find((level) => level._id === data.proyectos[0].nivel)

        project = {
            ...data.proyectos[0], 

            categoria: category.nombre,
            nivel: level.nombre, 
        }
    }

    return (
        <div>
            {!data ? <Spinner/> : <ProjectCard formData={project}/>}
        </div>
    )

}

export default DashboardResponsable