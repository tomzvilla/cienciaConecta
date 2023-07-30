// hooks
import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

// components
import ProjectCard from "../../components/Projects/ProjectCard"

const states = [
    {nombre: 'En instancia Escolar', _id: '0'},
    {nombre: 'En instancia Regional', _id: '1'},
    {nombre: 'En Evaluacion Regional', _id: '2'},
    {nombre: 'Evaluado en Regional', _id: '3'},
    {nombre: 'Promovido a Nacional', _id: '4'},
    {nombre: 'Finalizado', _id: '5'},
    {nombre: 'Inactivo', _id: '6'},
  ];

const ViewProject = () => {
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
    let state = {
        nombre: ''
    }
    let project = {}

    if(categoriesData && levelsData && data) {
        category = categoriesData.categoria.find((category) => category._id === data.proyecto.categoria)
        level = levelsData.nivel.find((level) => level._id === data.proyecto.nivel)
        state = states.find((state) => state._id === data.proyecto.estado)

        project = {
            ...data.proyecto, 
            categoria: category.nombre,
            nivel: level.nombre, 
            estado: state.nombre,
        }
    }




    return (
        <div>
            <h1> Feria de Ciencia y Tecnologia 2024</h1>
            {!data ? <p>Cargando...</p> : <ProjectCard formData={project}/>}
        </div>
    )
}

export default ViewProject