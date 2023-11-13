import { useLocation, useNavigate } from "react-router-dom";

const PostulanteHeader = (props) => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        const from = location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:`${location.pathname}`}})
    }
    
    return (
        <div className={`postulante-header postulante-header--${props.wide ? 'wide' : ''}`}>
            <div className="postulante-header__img-container" onClick={props.onClick ? props.onClick : handleClick}>
                <img src={require("../../../assets/flechaizq.png")} alt="Volver" className="postulante-header__img"/>
            </div>
            
            <h3 className="postulante-header__title">{props.title}</h3>
            {props.subtitle ?
            <h6 className="postulante-header__subtitle">CUIL: {props.subtitle}</h6>
            :
            null
            }
            
        </div>
    );
}

export default PostulanteHeader;