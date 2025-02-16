import "../../../css/style.css"
import Button from "../Button/Button";

const ComoEmpiezo = (props) => {
    return (
        <div className="como-empiezo">
            {window.innerWidth >= 800 ? <img className="como-empiezo__img" src={require("../../../assets/empiezo.webp")} alt=""  /> : ""}
            
            <h4 className="como-empiezo__title">¿Cómo empiezo?</h4>
            <p className="como-empiezo__text">Para ingresar a Ciencia Conecta necesitas una cuenta, con la que vas a poder postularte como evaluador e inscribir y gestionar proyectos</p>
            <div className="como-empiezo__button">
                <Button text="Ingresá" onClickHandler={props.openModal}/>
            </div>

            {window.innerWidth <= 800 ? <img className="como-empiezo__img" src={require("../../../assets/hero.webp")} alt="" /> : ""}
            
        </div>
    );
}

export default ComoEmpiezo;