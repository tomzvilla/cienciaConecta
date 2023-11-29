// components
import ProjectCard from "../Projects/ProjectCard"
import Spinner from "../Spinner/Spinner"
import BlankState from "../BlankState/BlankState"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useDispatch, useSelector } from "react-redux"
import capitalizeEachLetter from "../../utils/utils"
import { instanciasActions } from "../../../store/instancias-slice"

const DashboardResponsable = () => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const niveles = useSelector(state => state.niveles.niveles)
    const categorias = useSelector(state => state.categorias.categorias)

    const {data, isLoading} = useAxiosFetch('/proyecto/misProyectos', axiosPrivate)

    const { data: categoriaData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate, categorias.length !== 0)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, niveles.length !== 0)

    let proyectos = []

    if(data && ((!loadingCategorias && !loadingNiveles) || (niveles.length !== 0 && categorias.length !== 0))) {
      proyectos = data.proyectos.map(obj => {
        const nombreCat = categorias.length !== 0 ? categorias.find(element => element._id === obj.categoria) : categoriaData.categoria.find(element => element._id === obj.categoria)
        const nombreLev = niveles.length !== 0 ? niveles.find(element => element._id === obj.nivel) : nivelesData.nivel.find(element => element._id === obj.nivel)
        if(obj.estado !== '6') {
          return {...obj, categoria: nombreCat, nivel: nombreLev, nombreEscuela: capitalizeEachLetter(obj.establecimientoEducativo.nombre)}
        } else {
          return null
        }
      }).filter(project => project !== null).filter(p => p.estado !== '9')
      dispatch(instanciasActions.cargarProyectos(proyectos.length))
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