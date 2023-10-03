import "../../../css/style.css"
// components
import Button from "../Button/Button"
// hooks
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useNavigate} from "react-router-dom";

const Navbar = (props) => {
    const {auth} = useAuth()
    const navigate = useNavigate()
    const logout = useLogout()

    const signOut = async () => {
        await logout()
        navigate('/home')
    }

    const navigateHome =  () => {
        navigate('/home')
    }


    const modifier = props.home ? "--home" : ""
    
    return ( 
        <div className={`navbar navbar${modifier}`}>
            <div className="navbar__burguer">
                {/* <input type="checkbox" /> */}
                <span/>
                <span/>
                <span/>
            </div>

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