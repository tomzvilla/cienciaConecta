import Badge from "../Badge/Badge"

const ProjectCardDetails = (props) => {

    const findNivel = (nivel) => {
        const level = nivel.nombre ?? nivel
        const item = props.niveles.find((nivel) => level === nivel.nombre)
        return item ? item : null;
    }

    const findCategoria = (categoria) => {
        const cat = categoria.nombre ?? categoria
        const item = props.categorias.find((categoria) => cat === categoria.nombre)
        return item ? item : null;
    }

    console.log(props.datos)

    const level = typeof props.datos.nivel === "string" ? findNivel(props.datos.nivel) : props.datos.nivel
    const cat = typeof props.datos.categoria === "string" ? findCategoria(props.datos.categoria) : props.datos.categoria

    return (
        <div className="project-card-details">
                <p className="project-card-details__detail">
                    <strong>Descripción: </strong> 
                    {props.datos.descripcion}
                </p>
                <p className="project-card-details__detail">
                    <strong>Estado: </strong> 
                    {props.datos.nombreEstado}
                </p>
                <p className="project-card-details__detail">
                    <strong>Escuela: </strong> 
                    {props.datos.nombreEscuela}
                </p>
                <div className="project-card-details__badge-container">
                    <p className="project-card-details__badges">
                        <strong>Nivel: </strong> 
                        <Badge  key={level?._id} type={level}/>
                    </p>
                    <p className="project-card-details__badges">
                        <strong>Categoría: </strong> 
                        <Badge  key={cat?._id} type={cat}/>
                    </p>
                </div>
        </div>
    );
}

export default ProjectCardDetails;