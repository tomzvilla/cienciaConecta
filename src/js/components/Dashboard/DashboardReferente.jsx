import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";


const DashboardReferente = (props) => {

    const axiosPrivate = useAxiosPrivate()

    const { data, isLoading } = useAxiosFetch('/referente/info', axiosPrivate)

    return (
        <Card title="Feria de Ciencias y Tecnología 2024">
            {   
            isLoading ? 

            <Spinner/>
            :
            <div className="dashboard-referente">
                <div className="dashboard-referente__details">
                    <p><strong>Próxima instancia: </strong>  {data.referente.prox_instancia}</p>
                    <p><strong>Fin instancia {data.referente.instancia_actual}: </strong>{data.referente.prox_fecha}</p>
                </div>

                {
                    data.referente.instancia_actual === "Regional" ? 
                    <div className="dashboard-referente__details">
                        <h4><strong>Proyectos</strong></h4>
                        <p><strong>Proyectos pendientes de asignación: </strong>{data.referente.cant_proyectos_pendientes_asignacion}</p>
                        <p><strong>Proyectos en la sede: </strong>{data.referente.cant_proyectos_sede}</p>
                        <p><strong>Cantidad de evaluadores asignados: </strong>{data.referente.evaluadores.length} </p>
                    </div>

                    :

                    data.referente.instancia_actual === "Provincial" ? 

                    <div className="dashboard-referente__details">
                        <h4>Proyectos</h4>
                        <p>Proyectos pendientes de evaluación: {data.referente.cant_proyectos_por_evaluar_provincial}</p>
                        <p>Proyectos pendientes de confirmación: {data.referente.cant_proyectos_por_confirmar_provincial}</p>
                        <p>Cantidad de evaluadores asignados: {data.referente.evaluadores.length} </p>
                    </div>

                    :
                    
                    <div className="dashboard-referente__details">
                        <h4>Proyectos en la sede: {data.referente.cant_proyectos_sede}</h4>
                        <p>Proyectos pendientes de asignación: {data.referente.cant_proyectos_pendientes_asignacion}</p>
                        <p>Cantidad de evaluadores asignados: {data.referente.evaluadores.length} </p>
                    </div> 
                
                }

                

            </div>
            }   
        </Card >
    )



}

export default DashboardReferente;