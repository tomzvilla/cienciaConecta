import "../../../css/style.css"
// components
import Button from "../Button/Button"
// hooks
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
    const {auth} = useAuth()
    const navigate = useNavigate()
    const logout = useLogout()

    const signOut = async () => {
        await logout()
        navigate('/home')
    }

    console.log(auth)
    
    return (
        <div className="navbar">
            
            <h1 className="navbar__logo">CienciaConecta</h1>
            <div className="navbar__button-container">
                { auth?.cuil ?
                    <Button text="Salir" onClickHandler={signOut}/>
                    :
                    <Button text="Ingresá" onClickHandler={props.openModal}/>
                }
            </div>    
        </div>
    );
}

export default Navbar;