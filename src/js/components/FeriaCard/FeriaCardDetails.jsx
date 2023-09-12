const FeriaCardDetails = (props) => {

    const getInstancia = () => {
        // a futuro calcular aca la instancia actual
        return 'instanciaEscolar'
    }

    const fechaActual = new Date()
    const instanciaActual = getInstancia()

    // Función para encontrar la próxima instancia
    const encontrarProximaFecha = (instancias) => {
        let proximaFecha = Infinity;

        for (const instanciaNombre in instancias) {
          const instancia = instancias[instanciaNombre];
          for (const propiedad in instancia) {
            if (propiedad.includes("fecha")) {
                const fecha = new Date(instancia[propiedad]);
                if (fecha > fechaActual && fecha < proximaFecha) {
                    proximaFecha = fecha;
              }
            }
          }
        }
      
        return proximaFecha === Infinity ? null : formatDate(proximaFecha);

    }

    const formatDate = (date) => {
        return [
            padTo2Digits(date.getDate()),
            padTo2Digits(date.getMonth() + 1),
        ].join('/')
    }

    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }

    const proximaFecha = encontrarProximaFecha(props.datos.instancias)

    return (
        <div className="project-card-details">
                <p className="project-card-details__detail">
                    <strong>Descripción: </strong> 
                    {props.datos.descripcion}
                </p>
                <p className="project-card-details__detail">
                    <strong>Proyectos Inscriptos: </strong> 
                    {props.datos.proyectosInscriptos ?? 'TBC!'}
                </p>
                <p className="project-card-details__detail">
                    <strong>Evaluadores: </strong> 
                    {props.datos.evaluadores ?? 'TBC!'}
                </p>
                <p className="project-card-details__detail">
                    <strong>Proyectos Activos:: </strong> 
                    {props.datos.proyectosActivos ?? 'TBC!'}
                </p>
                <p className="project-card-details__detail">
                    <strong>Fecha Proxima Instancia: </strong> 
                    {proximaFecha}
                </p>
                <p className="project-card-details__detail">
                    <strong>Estado: </strong> 
                    {props.datos.nombreEstado ?? 'TBC!!'}
                </p>
        </div>
    );
}


export default FeriaCardDetails;