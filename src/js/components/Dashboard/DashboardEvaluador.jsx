// components
import Card from "../Card/Card"
import Spinner from "../Spinner/Spinner"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import SmallTable from "../Table/SmallTable"
import BlankState from "../BlankState/BlankState"

const DashboardEvaluador= () => {
    const axiosPrivate = useAxiosPrivate()

    let { data: evaluadorInfo, isLoading } = useAxiosFetch('/evaluador/info', axiosPrivate)
    
    let evaluador = undefined
    if (evaluadorInfo) {
        evaluador = evaluadorInfo.evaluador
    }
    
    return (
        <Card title='Resumen de Evaluador'>
            {isLoading ? <Spinner/> : evaluador ? 

            <div className="dashboard-evaluador">
                <div className="dashboard-evaluador__instancia">
                    <p>Próxima instancia: {evaluador.prox_instancia}</p>
                    <p> Fin instancia {evaluador.instancia_actual}: {evaluador.prox_fecha} </p>
                </div>
                
                <div className="dashboard-evaluador__proyectos">
                    <h4>Proyectos</h4>
                    <p>Asignados: {evaluador.cant_proyectos_asignados ? evaluador.cant_proyectos_asignados : 0}</p>
                    <p>En proceso de evaluación: {evaluador.cant_proyectos_pendientes ? evaluador.cant_proyectos_pendientes : 0}</p>
                </div>
                
                <div className="dashboard-evaluador__tabla">
                    {evaluador.proyectos_asignados.length > 0 ? <SmallTable title="Proyectos Activos" data={evaluador.proyectos_asignados} viewPath={'/evaluar'}/>  : "" }
                </div> 
            </div>
                :
            <BlankState msg='No pudimos encontrar estos datos. ¡Intentá de nuevo mas tarde!' />
            }
        </Card>
    )
}

export default DashboardEvaluador