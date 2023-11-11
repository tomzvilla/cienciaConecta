import Badge from "../Badge/Badge"

const ProjectCardDetails = (props) => {

    const findNivel = (nombre) => {
        const item = props.niveles.nivel.find((nivel) => nombre === nivel.nombre)
        return item ? item : null;
    }

    const findCategoria = (nombre) => {
        const item = props.categorias.categoria.find((categoria) => nombre === categoria.nombre)
        return item ? item : null;
    }

    const level = findNivel(props.datos.nivel)
    const cat = findCategoria(props.datos.categoria)


    return (
        <div className="project-card-details">

                <p className="project-card-details__detail">
                    <strong>Descripción: </strong> 
                    {props.datos.descripcion}
                </p>
                <p className="project-card-details__badges">
                    <strong>Categoria: </strong> 
                    <Badge  key={cat._id} type={cat}/>
                </p>
                <p className="project-card-details__detail">
                    <strong>Escuela: </strong> 
                    {props.datos.nombreEscuela}
                </p>
                <p className="project-card-details__badges">
                    <strong>Nivel: </strong> 
                    <Badge  key={level._id} type={level}/>
                </p>
                <p className="project-card-details__detail">
                    <strong>Estado: </strong> 
                    {props.datos.nombreEstado}
                </p>
        </div>
    );
}


export default ProjectCardDetails;