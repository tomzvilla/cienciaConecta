import "../../../css/style.css"
import Button from "../Button/Button"

const Navbar = (props) => {
    
    return ( 
        <div className="navbar">
            <h1 className="navbar__logo">CienciaConecta</h1>
            <div className="navbar__button-container">
                <Button text="Ingresá" onClickHandler={props.openModal}/>
            </div>    
        </div>
    );
}

export default Navbar;