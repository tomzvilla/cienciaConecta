// components
import ProjectCard from "../Projects/ProjectCard"
import Spinner from "../Spinner/Spinner"
import BlankState from "../BlankState/BlankState"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import capitalizeEachLetter from "../../utils/utils"


const DashboardResponsable = () => {
    const axiosPrivate = useAxiosPrivate()

    const {data, isLoading} = useAxiosFetch('/proyecto/misProyectos', axiosPrivate)
    const { data: categoriesData} = useAxiosFetch('/categoria', axiosPrivate)
    const { data: levelsData} = useAxiosFetch('/nivel', axiosPrivate)

    let nombreCat = '';
    let nombreLev = '';

    let proyectos = []

    if(data && categoriesData && levelsData) {

      proyectos = data.proyectos.map(obj => {
        nombreCat = categoriesData.categoria.find(element => element._id === obj.categoria)
        nombreLev = levelsData.nivel.find(element => element._id === obj.nivel)
        if(obj.estado !== '6') {
          return {...obj, categoria: nombreCat, nivel: nombreLev, nombreEscuela: capitalizeEachLetter(obj.establecimientoEducativo.nombre)}
        } else {
          return null
        }
      }).filter(project => project !== null)
    }

    return (
        <div>
            { isLoading ? <Spinner/> : 
            
            data ? 
            proyectos.map((proyecto, index) => <ProjectCard key={index} formData={proyecto}/>)

              :

            <BlankState msg="Todavía no tenés proyectos inscriptos. ¡Intentá de nuevo mas tarde!"/>

            }
        </div>
    )

}

export default DashboardResponsable