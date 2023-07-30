// components
import { Link } from "react-router-dom"

const ProjectCard = ({ formData }) => {
    
    return (
        <div className="project-card">
            <h2 className="project-card__feria"> Proyecto de Feria 2024</h2>
            <div className="project-card__details">
                <p>
                    <strong>Título: </strong> 
                    {formData.titulo}
                </p>
                <p>
                    <strong>Descripción: </strong> 
                    {formData.descripcion}
                </p>
                <p>
                    <strong>Escuela: </strong> 
                    {formData.nombreEscuela}
                </p>
                <p>
                    <strong>Categoria: </strong> 
                    {formData.cateogria}
                </p>
                <p>
                    <strong>Nivel: </strong> 
                    {formData.nivel}
                </p>
                <p>
                    <strong>Estado: </strong> 
                    {formData.estado}
                </p>
                <button>
                    <Link to={`/editProjects/${formData._id}`}>Editar</Link>
                </button>
            </div>
        </div>
    )
}

export default ProjectCard