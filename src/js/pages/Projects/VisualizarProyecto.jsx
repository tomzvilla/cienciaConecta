// hooks
import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useSelector } from "react-redux"
// components
import ProjectCard from "../../components/Projects/ProjectCard"
import Spinner from "../../components/Spinner/Spinner"
import Metadata from "../../components/Metadata/Metadata"
import capitalizeEachLetter from "../../utils/utils"

const VisualizarProyecto = () => {
    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { data } = useAxiosFetch(`/proyecto/${id}`, axiosPrivate)
    const niveles = useSelector(state => state.niveles.niveles)
    const categorias = useSelector(state => state.categorias.categorias)
    const {data: categories, isLoading: loadingCategorias} = useAxiosFetch('/categoria', axiosPrivate, niveles.length !== 0)
    const {data: levels, isLoading: loadingNiveles} = useAxiosFetch('/nivel', axiosPrivate, categorias.length !== 0)

    let project = {}

    if(data && ((!loadingCategorias && !loadingNiveles) || (niveles.length !== 0 && categorias.length !== 0))) {
        const category = categorias.length !== 0 ? categorias.find(element => element._id === data.proyecto.categoria) : categories.categoria.find(element => element._id === data.proyecto.categoria)
        const level = niveles.length !== 0 ? niveles.find(element => element._id === data.proyecto.nivel) : levels.nivel.find(element => element._id === data.proyecto.nivel)

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