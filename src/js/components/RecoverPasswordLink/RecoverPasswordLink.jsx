import { Link, useLocation } from "react-router-dom";

const RecoverPasswordLink = () => {
    const location = useLocation()
    return (
        <div className="recover-link">
            <p className="recover-link__text" >¿No recordás tu contraseña? </p>
            <Link className="recover-link__link" to="/recuperarCredenciales" state={{ from: `${location.pathname}`}}>Recuperala desde acá</Link>
        </div>
    );
}

export default RecoverPasswordLink;