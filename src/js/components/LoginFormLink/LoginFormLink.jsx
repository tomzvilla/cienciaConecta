import { Link } from "react-router-dom";
const LoginFormLink = () => {
    return (
        <div className="login-form-link">
            <p className="login-form-link__text" >¿No sos usuario? </p>
            <Link className="login-form-link__link" to="/signup">¡Crea tu cuenta acá!</Link>
        </div>
    );
}


export default LoginFormLink;