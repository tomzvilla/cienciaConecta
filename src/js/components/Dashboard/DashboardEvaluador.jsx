// components
import Card from "../Card/Card"
import Spinner from "../Spinner/Spinner"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import SmallTable from "../Table/SmallTable"

const DashboardEvaluador= () => {
    const axiosPrivate = useAxiosPrivate()

    let { data: evaluadorInfo, isLoading } = useAxiosFetch('/evaluador/info', axiosPrivate)
    
    let evaluador = undefined
    if (evaluadorInfo) {
        evaluador = evaluadorInfo.evaluador
    }
    
    return (
        <Card title={'Dashboard'}>
            {!isLoading && evaluador ? 

            <div className="dashboard-evaluador">
                <div className="dashboard-evaluador__instancia">
                    <p>Próxima instancia: {evaluador.prox_instancia}</p>
                    <p> Fin instancia {evaluador.instancia_actual}: {evaluador.prox_fecha} </p>
                </div>
                
                <div className="dashboard-evaluador__proyectos">
                    <h4>Proyectos</h4>
                    <p>Asignados: {evaluador.cant_proyectos_asignados}</p>
                    <p>Pendientes de evaluación: {evaluador.cant_proyectos_pendientes}</p>
                </div>
                
                
                <div className="dashboard-evaluador__tabla">
                    <SmallTable title="Proyectos Activos" data={evaluador.proyectos_asignados} viewPath={'/proyecto'}/> 
                </div> 
            </div>
                :
            <Spinner/> 
            }
        </Card>
    )
}

export default DashboardEvaluador