// components
import FeriaCardDetails from "./FeriaCardDetails"
import ImageLink from "../ImageLink/ImageLink"

const FeriaCard = ({ formData }) => {
    
    return (
        <div className="project-card">
            <h2 className="project-card__titulo"> {formData.nombre}</h2>

            <div className="project-card__edit">
                <ImageLink src={require("../../../assets/edit.png")} linkto={`/editFeria/${formData._id}`} alt="Editar Feria"/>
            </div>

            <FeriaCardDetails datos={formData}/>
            
        </div>
    )
}

export default FeriaCard