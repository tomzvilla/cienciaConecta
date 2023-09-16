// components
import FeriaCardDetails from "./FeriaCardDetails"
import ImageLink from "../ImageLink/ImageLink"
import ImageButton from "../ImageButton/ImageButton"

const FeriaCard = ({ formData, handleDelete }) => {
    
    return (
        <div className="project-card">
            <h2 className="project-card__titulo"> {formData.nombre}</h2>

            <div className="project-card__edit">
                <ImageLink src={require("../../../assets/edit.png")} linkto={`/editarFeria`} alt="Editar Feria"/>
                <ImageButton small={false} alt="Borrar" linkto={""} callback={handleDelete} src={require("../../../assets/x.png")}/>
            </div>

            <FeriaCardDetails datos={formData}/>
            
        </div>
    )
}

export default FeriaCard