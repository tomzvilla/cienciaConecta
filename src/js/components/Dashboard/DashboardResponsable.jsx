// components
import ProjectCard from "../Projects/ProjectCard"
import Spinner from "../Spinner/Spinner"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

import capitalizeEachLetter from "../../utils/utils"

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
    let proyectos = []

    if(data && categoriesData && levelsData) {

      proyectos = data.proyectos.map(obj => {
        const category = categoriesData.categoria.find(element => element._id === obj.categoria)
        const level = levelsData.nivel.find(element => element._id === obj.nivel)
        if(obj.estado !== '6') {
          return {...obj, categoria: category.nombre, nivel: level.nombre, nombreEscuela: capitalizeEachLetter(obj.establecimientoEducativo.nombre)}
        } else {
          return null
        }
      }).filter(project => project !== null)
    }


    return (
        <div>
            {!data ? <Spinner/> : 
            proyectos.map((proyecto, index) => <ProjectCard key={index} formData={proyecto}/>)
            }
        </div>
    )

}

export default DashboardResponsable