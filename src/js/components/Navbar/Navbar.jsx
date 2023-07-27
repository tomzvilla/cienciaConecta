import "../../../css/style.css"
import Button from "../Button/Button"

const Navbar = () => {
    return (
        <div className="navbar">
            <h1 className="navbar__logo">CienciaConecta</h1>
            <div className="navbar__button-container">
            <Button text="Ingresá"/>
            </div>
            
        </div>
    );
}

export default Navbar;