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
                    <p>Próxima instancia: {data.referente.prox_instancia}</p>
                    <p>Fin instancia {data.referente.instancia_actual}: {data.referente.prox_fecha}</p>
                </div>

                {
                    data.referente.instancia_actual === "Regional" ? 
                    <div className="dashboard-referente__details">
                        <h4>Proyectos</h4>
                        <p>Proyectos pendientes de evaluación: {data.referente.cant_proyectos_por_evaluar_regional}</p>
                        <p>Proyectos pendientes de confirmación: {data.referente.cant_proyectos_por_confirmar_regional}</p>
                        <p>Cantidad de evaluadores asignados: {data.referente.evaluadores.length} </p>
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