import "../../../css/style.css"
// components
import Button from "../Button/Button"
import DropdownButton from "../DropdownButton/DropdownButton";
// hooks
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useLocation, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import { useEffect, useState } from "react";
import ImageLink from "../ImageLink/ImageLink";
import NavbarCampana from "./NavbarCampana";

const Navbar = (props) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const {auth} = useAuth()
    const navigate = useNavigate()
    const logout = useLogout()
    const dispatch = useDispatch()
    const location = useLocation()
    const showNavbarMenu = useSelector(state => state.ui.navbarMenu)

    const signOut = async () => {
        await logout()
        dispatch(uiActions.toggleNavbarMenu())
    }

    const navigateHome =  () => {
        navigate('/home')
    }

    const navigatePerfil =  () => {
        navigate('/perfil')
    }

    const showSidebar = () => {
        dispatch(uiActions.showSidebar())
    }

    const toggleNavbarMenu = () => {
        dispatch(uiActions.toggleNavbarMenu())
    }

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
      


    const modifier = props.home ? "--home" : ""

    return ( 
        <div className={`navbar navbar${modifier}`}>
            { auth?.roles ? 
            <div onClick={showSidebar} className="navbar__burguer">
                <span/>
                <span/>
                <span/>
            </div> : null }

            {window.innerWidth <= 600 ? <img className="navbar__img" onClick={navigateHome} src={require("../../../assets/isotipo-cortado.png")}/> : <h1 className="navbar__logo" onClick={navigateHome}>CienciaConecta</h1>}
            

            <div className="navbar__button-container">
                { auth?.roles ?
                    <>
                        <NavbarCampana />
                        <DropdownButton img={require("../../../assets/user.png")} dropdown={showNavbarMenu} onClick={toggleNavbarMenu} navigatePerfil={navigatePerfil} signOut={signOut}/>
                    </>
                   :
                    <Button text="Ingresar" onClickHandler={location.pathname !== '/home' ? navigateHome : props.openModal }/>
                }
            </div>    
        </div>
    );
}

export default Navbar;