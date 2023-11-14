import { useSelector } from "react-redux";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import BlankState from "../BlankState/BlankState";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";

const DashboardReferente = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const { data, isLoading } = useAxiosFetch('/referente/info', axiosPrivate)

    const feria = useSelector(state => state.instancias.feria)

    return (
        <Card title="Resumen Referente de Evaluador">
            {   
            isLoading ? 

            <Spinner/>
            : data ?
            <div className="dashboard-referente">
                <div className="dashboard-referente__details">
                    <p><strong>Próxima instancia: </strong>  {data.referente.prox_instancia}</p>
                    <p><strong>Fin instancia {data.referente.instancia_actual}: </strong>{data.referente.prox_fecha}</p>
                </div>

                {feria > 3 && feria <= 7 ? 
                    <div className="dashboard-referente__details">
                        <h4><strong>Proyectos</strong></h4>
                        <p><strong>Proyectos pendientes de evaluación: </strong>{data.referente.cant_proyectos_por_evaluar_regional}</p>
                        <p><strong>Proyectos pendientes de confirmación: </strong>{data.referente.cant_proyectos_por_confirmar_regional}</p>
                        <p><strong>Cantidad de evaluadores asignados: </strong>{data.referente.evaluadores.length} </p>
                    </div>
                    :
                    feria > 7 ? 
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
                :
                <BlankState msg="No pudimos encontrar estos datos, ¡Intentá de nuevo mas tarde!"/>
            }   
        </Card >
    )
}

export default DashboardReferente;