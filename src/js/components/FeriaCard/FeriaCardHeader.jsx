// components
import ImageLink from "../ImageLink/ImageLink"
// hooks
import { useLocation, useNavigate } from "react-router-dom"


const FeriaCardHeader = (props) => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        const from = location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:`${location.pathname}`}})
    }

    return (
        <div className="project-card-header">

            <img src={require("../../../assets/flechaizq.png")} alt="Volver" className="project-card-header__img" onClick={handleClick}/>

            
            <h2 className="project-card-header__titulo"> {props.datosFeria.nombre}</h2>


            <div className="project-card-header__botones">
                <ImageLink img={<img alt="Editar Proyecto" src={require("../../../assets/edit.png")}  className="project-card-header__img"/>} linkto={`/editarFeria`}/>
                <img alt="Borrar" src={require("../../../assets/x.png")} onClick={props.handleDelete} className="project-card-header__img"/>
            </div>

        </div>
    );
}

export default FeriaCardHeader;