import { useSelector } from "react-redux";
import ImageLink from "../ImageLink/ImageLink";

const NavbarCampana = (props) => {
    const notificaciones = useSelector(state => state.notificaciones.notificaciones) 
    const sinLeer = notificaciones.filter(obj => obj.estado === "1");
    
    return (
        <div className="navbar-campana">
            {sinLeer.length ? <div className="navbar-campana__numero">{sinLeer.length}</div> : ""}
            <ImageLink linkto="/notificaciones" img={<img className="navbar-campana__img" src={require("../../../assets/campana.png")} alt="Notificaciones" />}/>
        </div>

    )
}

export default NavbarCampana;