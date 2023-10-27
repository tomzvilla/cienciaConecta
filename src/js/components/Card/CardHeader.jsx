import { useLocation, useNavigate } from "react-router-dom"

const CardHeader = (props) => {

    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        const from = location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:'/evaluar/:id'}})
    }

    return (
        <div className={`card-header card-header--${props.wide ? 'wide' : ''}`}>
            {props.goBack ? <div className="card-header__img-container" onClick={handleClick}>
                                <img src={require("../../../assets/flechaizq.png")} alt="Volver" className="card-header__img"/>
                            </div> : ""}
            <h3 className="card-header__title">{props.title}</h3>
        </div>
    );
}


export default CardHeader;