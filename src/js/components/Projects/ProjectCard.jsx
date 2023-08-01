// components
import { Link } from "react-router-dom"
import ProjectCardDetails from "./ProjectCardDetails"
import Button from "../Button/Button"
import ImageLink from "../ImageLink/ImageLink"

const ProjectCard = ({ formData }) => {
    
    return (
        <div className="project-card">
            <h2 className="project-card__titulo"> Proyecto de Feria 2024</h2>

            <div className="project-card__edit">
                <ImageLink src={require("../../../assets/edit.png")} linkto={`/editProjects/${formData._id}`} alt="Editar Proyecto"/>
            </div>

            <ProjectCardDetails datos={formData}/>
            
        </div>
    )
}

export default ProjectCard