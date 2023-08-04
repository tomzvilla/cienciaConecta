import Button from "../Button/Button";
import CardData from "../CardData/CardData";
import SignupConfirmColumn from "../SignupConfirmColumn/SignupConfirmColumn";

const SignupConfirm = (props) => {

    const primeraTitulos = ["CUIL", "DNI", "Apellido", "Nombre", "CUE", "Cargo"]
    const segundaTitulos = ["Teléfono", "Email", "Contraseña"]

    const primeraDatos = [props.formValues.cuil, props.formValues.dni, props.formValues.lastname, props.formValues.name, props.formValues.cue ,props.formValues.position]
    const segundaDatos = [props.formValues.phoneNumber, props.formValues.email, props.formValues.password]


    return (
        <div className="signup-confirm">
            
            <div className="signup-confirm__column signup-confirm__column--1">
                <SignupConfirmColumn titles={primeraTitulos} values={primeraDatos}/>
            </div>
            
            <div className="signup-confirm__column signup-confirm__column--2">
                <SignupConfirmColumn titles={segundaTitulos} values={segundaDatos}/>
            </div>




            <div className='signup-confirm__button-container'>
                <Button text='Volver' onClickHandler={props.handleVolver} activo={false}/>
                <Button text='Confirmar' onClickHandler={props.handleSubmit} activo={true}/>
          </div>
        </div>
    )  
}

export default SignupConfirm;