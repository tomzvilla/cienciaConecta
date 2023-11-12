// components
import ProjectCard from "../Projects/ProjectCard"
import Spinner from "../Spinner/Spinner"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useDispatch } from "react-redux"
import capitalizeEachLetter from "../../utils/utils"
import { instanciasActions } from "../../../store/instancias-slice"

const DashboardResponsable = () => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()

    const {data} = useAxiosFetch('/proyecto/misProyectos', axiosPrivate)
    const { data: categoriesData} = useAxiosFetch('/categoria', axiosPrivate)
    const { data: levelsData} = useAxiosFetch('/nivel', axiosPrivate)

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
      }).filter(project => project !== null).filter(p => p.estado !== '9')
      dispatch(instanciasActions.cargarProyectos(proyectos.length))
    }


    return (
        <div>
            {!data ? 
            <Spinner/> 
            :
            proyectos.map((proyecto, index) => <ProjectCard key={index} formData={proyecto}/>)}
        </div>
    )

}

export default DashboardResponsable