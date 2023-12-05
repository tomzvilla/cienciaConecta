// components
import ImageLink from "../ImageLink/ImageLink"
import Button from "../Button/Button"
// hooks
import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"


const ProjectCardHeader = (props) => {
    const location = useLocation()
    const navigate = useNavigate()
    const [resize, setResize] = useState(window.innerWidth <= 800);

    const handleClick = () => {
        const from = location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:`${location.pathname}`}})
    }

    const handleResize = () => {
        setResize(window.innerWidth <= 800);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    return (
        <div className="project-card-header">

            {props.goBack ? <img src={require("../../../assets/flechaizq.png")} alt="Volver" className="project-card-header__img" onClick={handleClick}/> : ""}

            
            <h2 className="project-card-header__titulo"> {props.datos.titulo}</h2>


            { !props.antiguo &&
            <div className="project-card-header__botones">
                {!resize ? <Button 
                    text='Descargar QR' 
                    onClickHandler={props.handleDownload}
                    activo={false}
                /> : <img alt='Descargar QR' src={require("../../../assets/qr.png")} className="project-card-header__img" onClick={props.handleDownload}/>}
                
                <ImageLink img={<img alt="Editar Proyecto" src={require("../../../assets/edit.png")}  className="project-card-header__img"/>} linkto={`/editarProyecto/${props.datos._id}`}/>
                <img alt="Borrar" src={require("../../../assets/x.png")} onClick={props.handleDelete} className="project-card-header__img"/>
            </div>
            }

        </div>
    );
}

export default ProjectCardHeader;