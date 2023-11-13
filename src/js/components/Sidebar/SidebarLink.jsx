import { useEffect, useState } from "react"
import {useLocation, Link, useMatch} from "react-router-dom"

// Recibe una imagen, un texto, y un link para navegar onClick
const SidebarLink = (props) => {
    const location = useLocation()

    const checkRoute = (path, current) =>{
        return current.startsWith(path)
    }

    const [active, setActive] = useState(checkRoute(props.linkto, location.pathname))

    useEffect(() => {
        setActive(checkRoute(props.linkto, location.pathname))
    }, [location.pathname])
    

    useEffect(() => {
        const element = document.getElementById(props.linkto);

        if (element) {
            if (active) {
                element.classList.add("sidebar-link__text--active");
            } else {
                element.classList.remove("sidebar-link__text--active");
            }

            if (props.dropdown) {
                element.classList.add("sidebar-link__text--dropdown");
            } else {
                element.classList.remove("sidebar-link__text--dropdown");
            }
        }

        return () => {
            if (element) {
                element.classList.remove("sidebar-link__text--active");
                element.classList.remove("sidebar-link__text--dropdown");
            }
        };

        
    });

    return (
        <div className={active ? "sidebar-link sidebar-link--active" : "sidebar-link"}>
            <Link to={props.linkto} state={{from: location.pathname}} className="sidebar-link__link">
                <img className={active ? "sidebar-link__image sidebar-link__image--active" : "sidebar-link__image"} src={props.img} alt="" />
                <p className="sidebar-link__text" id={props.linkto}>{props.text}</p>
            </Link>
        </div>
    )



}

export default SidebarLink;