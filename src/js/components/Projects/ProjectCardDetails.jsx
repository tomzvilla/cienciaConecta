const ProjectCardDetails = (props) => {

    return (
        <div className="project-card-details">
                <p className="project-card-details__detail">
                    <strong>Título: </strong> 
                    {props.datos.titulo}
                </p>
                
                <p className="project-card-details__detail">
                    <strong>Escuela: </strong> 
                    {props.datos.nombreEscuela}
                </p>
                <p className="project-card-details__detail">
                    <strong>Descripción: </strong> 
                    {props.datos.descripcion}
                </p>
                <p className="project-card-details__detail">
                    <strong>Categoria: </strong> 
                    {props.datos.categoria}
                </p>
                <p className="project-card-details__detail">
                    <strong>Nivel: </strong> 
                    {props.datos.nivel}
                </p>
                <p className="project-card-details__detail">
                    <strong>Estado: </strong> 
                    {props.datos.nombreEstado}
                </p>
        </div>
    );
}


export default ProjectCardDetails;