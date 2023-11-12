import Card from "../Card/Card"
import Lottie from "lottie-react";
import errorSpinner from "../../../assets/errorSpinner.json";
import successSpinner from "../../../assets/successSpinner.json";


const ConfirmacionCuenta = (props) => {


    return (
        <Card title="Confirmación de cuenta">
            
            {props.error ? 
                <div className="blank-state">
                    <Lottie animationData={errorSpinner} loop={false} autoplay={true} renderer="svg" style={{ height: 300 + 'px'}}/>
                    {/* <img src={require("../../../assets/blank.png")} alt="Error" className="blank-state__img blank-state__img--error"/> */}
                    <h3 className="blank-state__text">Hubo un problema confirmando tu cuenta,
                        ¡Intentá de nuevo mas tarde!</h3>
                </div>
                :
                <div className="blank-state">
                    {/* <img src={require("../../../assets/isotipo.png")} alt="Isotipo" className="blank-state__img blank-state__img--isotipo"/> */}
                    <Lottie animationData={successSpinner} loop={true} autoplay={true} renderer="svg" style={{ height: 300 + 'px'}}/>
                    <h3 className="blank-state__text">¡Tu cuenta ha sido confirmada correctamente!</h3>
                </div>
                }
            
        </Card>
    )

}

export default ConfirmacionCuenta;