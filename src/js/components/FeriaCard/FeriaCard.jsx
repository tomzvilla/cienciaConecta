// components
import Card from "../Card/Card"
import FeriaCardHeader from "./FeriaCardHeader"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import Spinner from "../Spinner/Spinner"

const FeriaCard = ({ datosFeria, handleDelete }) => {
    const axiosPrivate = useAxiosPrivate()
    const { data, isLoading } = useAxiosFetch('/feria/info', axiosPrivate)

    function formatDate(inputDate) {
        const date = new Date(inputDate);

        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; 
        const year = date.getUTCFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;
      
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
      
        return formattedDate;
      }

    
    return (
        <Card wide={true} className="project-card" header={<FeriaCardHeader handleDelete={handleDelete} datosFeria={datosFeria}/>}>

            {isLoading ? <Spinner /> :
                <div className="project-card-details">
                    <p className="project-card-details__detail">
                        <strong>Descripción: </strong> 
                        {datosFeria.descripcion}
                    </p>
                    <p className="project-card-details__detail">
                        <strong>Instancia actual: </strong> 
                        {data.feria.instancia_actual}
                    </p>
                    
                    <p className="project-card-details__detail">
                        <strong>Total proyectos presentados: </strong> 
                        {data.feria.total_proyectosPresentados ?? "0" }
                    </p>  
                    <p className="project-card-details__detail">
                        <strong>Fecha fin instancia actual: </strong> 
                        {formatDate(data.feria.prox_fecha)}
                    </p>
                    <p className="project-card-details__detail">
                        <strong>Total evaluadores: </strong> 
                        {data.feria.total_evaluadores ?? '0'}
                    </p>
                    <p className="project-card-details__detail">
                        <strong>Próxima instancia: </strong> 
                        {data.feria.prox_instancia}
                    </p>
                    <p className="project-card-details__detail">
                        <strong>Total proyectos evaluados: </strong> 
                        {data.feria.total_proyectosEvaluados ?? '0'}
                    </p>
                </div>
            }   
        </Card>
    )
}

export default FeriaCard