import { useLocation, useNavigate } from "react-router-dom";

const TablaProyectosAsignadosHeader = (props) => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleClick = () => {
        const from = location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:'/proyectosParaAsignar'}})
    }

    console.log(props.wide)
    
    return (
        <div className={`postulante-header postulante-header--wide`}>
            <div className="postulante-header__img-container" onClick={handleClick}>
                <img src={require("../../../assets/flechaizq.png")} alt="Volver" className="postulante-header__img"/>
            </div>
            
            <h3 className="postulante-header__title">{props.title}</h3>
        </div>
    );
}

export default TablaProyectosAsignadosHeader;