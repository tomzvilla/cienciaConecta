import { Link, useLocation } from "react-router-dom";
const LoginFormLink = () => {
    const location = useLocation()
    return (
        <div className="login-form-link">
            <p className="login-form-link__text" >¿No sos usuario? </p>
            <Link className="login-form-link__link" to="/signup" state={{ from: `${location.pathname}`}}>¡Crea tu cuenta acá!</Link>
        </div>
    );
}


export default LoginFormLink;