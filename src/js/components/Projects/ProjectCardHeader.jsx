import ImageButton from "../ImageButton/ImageButton"
import ImageLink from "../ImageLink/ImageLink"
import Button from "../Button/Button"
import { useLocation, useNavigate } from "react-router-dom"


const ProjectCardHeader = (props) => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        const from = location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:'/postulante/:id'}})
    }

    return (
        <div className="project-card-header">

            {props.goBack ? <img src={require("../../../assets/flechaizq.png")} alt="Volver" className="project-card-header__img" onClick={handleClick}/> : ""}

            
            <h2 className="project-card-header__titulo"> {props.datos.titulo}</h2>


            <div className="project-card-header__botones">
                <Button 
                    text='Descargar QR' 
                    onClickHandler={props.handleDownload}
                    activo={false}
                />
                <ImageLink img={<img alt="Editar Proyecto" src={require("../../../assets/edit.png")} onClick={props.handleDelete} className="project-card-header__img"/>} linkto={`/editarProyecto/${props.datos._id}`}/>
                <img alt="Borrar" src={require("../../../assets/x.png")} onClick={props.handleDelete} className="project-card-header__img"/>
            </div>

        </div>
    );
}

export default ProjectCardHeader;