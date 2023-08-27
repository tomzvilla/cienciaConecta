//hooks
import { useLocation, Link } from "react-router-dom";
// Recibe una imagen, un texto, y un link para navegar onClick
const SidebarLink = (props) => {
    
    const location = useLocation()

    return (
        <div className="sidebar-link">
            <Link to={props.linkto} state={{from: location.pathname}}>
                <img className="sidebar-link__image" src={props.img} alt="" />
                <p className="sidebar-link__text">{props.text}</p>
            </Link>
        </div>
    )



}

export default SidebarLink;