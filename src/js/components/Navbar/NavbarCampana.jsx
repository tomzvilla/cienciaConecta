import { useSelector } from "react-redux";
import ImageLink from "../ImageLink/ImageLink";

const NavbarCampana = (props) => {
    const notificacionesSinLeer = useSelector(state => state.notificaciones.numeroNoLeidas) 

    return (
        <div className="navbar-campana">
            {notificacionesSinLeer > 0 ? <div className="navbar-campana__numero">{notificacionesSinLeer}</div> : ""}
            <ImageLink linkto="/notificaciones" img={<img className="navbar-campana__img" src={require("../../../assets/campana.png")} alt="Notificaciones" />}/>
        </div>

    )
}

export default NavbarCampana;