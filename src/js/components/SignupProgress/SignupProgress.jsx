const SignupProgress = (props) => {
    const modifierCuenta = props.avanzar ? "--fill" : ""
    const modifierConfirmar = props.confirmar ? "--fill" : ""


    return (
        <div className="signup-progress">
            <div className="signup-progress__barra signup-progress__barra--fill">
                Datos Personales
            </div>
            <div className={`signup-progress__barra signup-progress__barra${modifierCuenta}`}>
                Datos de Cuenta
            </div>
            <div className={`signup-progress__barra signup-progress__barra${modifierConfirmar}`}>
                Confirmar
            </div>
        </div>
    )
}

export default SignupProgress;