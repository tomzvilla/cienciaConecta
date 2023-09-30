import "../../../css/style.css"
// components
import Button from "../Button/Button"
import ImageButton from "../ImageButton/ImageButton";
import burger from '../../../assets/burger.svg'
// hooks
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

const Navbar = (props) => {
    const {auth} = useAuth()
    const navigate = useNavigate()
    const logout = useLogout()
    const dispatch = useDispatch()

    const signOut = async () => {
        await logout()
        navigate('/home')
    }

    const navigateHome =  () => {
        navigate('/home')
    }

    const showSidebar = () => {
        console.log('showSidebar')
        dispatch(uiActions.showSidebar())
    }


    const modifier = props.home ? "--home" : ""
    
    return ( 
        <div className={`navbar navbar${modifier}`}>
            <ImageButton burger={true} small={false} src={burger} callback={showSidebar} text="Mostrar barra lateral"/>
            <h1 className="navbar__logo" onClick={navigateHome}>CienciaConecta</h1>
            <div className="navbar__button-container">
                { auth?.roles ?
                    <Button text="Salir" onClickHandler={signOut}/>
                    :
                    <Button text="Ingresá" onClickHandler={props.openModal}/>
                }
            </div>    
        </div>
    );
}

export default Navbar;