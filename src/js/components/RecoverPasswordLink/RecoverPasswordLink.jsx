import { Link, useLocation } from "react-router-dom";
const RecoverPasswordLink = () => {
    const location = useLocation()
    return (
        <div className="login-form-link">
            <p className="login-form-link__text" >¿No recordás tu contraseña? </p>
            <Link className="login-form-link__link" to="/recuperarCredenciales" state={{ from: `${location.pathname}`}}>Recuperala desde acá</Link>
        </div>
    );
}

export default RecoverPasswordLink;