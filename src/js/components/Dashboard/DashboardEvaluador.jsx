// components
import Card from "../Card/Card"
import Spinner from "../Spinner/Spinner"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import SmallTable from "../Table/SmallTable"


const DashboardEvaluador= () => {
    const axiosPrivate = useAxiosPrivate()
    //let proyectos = []

    const {data, isLoading} = useAxiosFetch('/proyecto/misProyectos', axiosPrivate)

    // Poner consulta de endpoint
    //const {data} = useAxiosFetch('/endpoint', axiosPrivate)

    const prueba = {
        nombreInstancia: 'Regional',
        fechaFin: '16/10/23',
        proyectosAsignados: 3,
        pendientesEvaluacion: 2,
    }

    if (data) {
        console.log(data)
    }


    return (
        <div>
            
            <Card title={'Dashboard'}>
            {!data ? 
            <Spinner/> 
            : 

            <div className="dashboard-evaluador">
                <div className="dashboard-evaluador__instancia">
                    <p>Próxima instancia: {prueba.nombreInstancia}</p>
                    <p>Fin instancia {prueba.nombreInstancia}: {prueba.fechaFin}</p>
                </div>
                
                <div className="dashboard-evaluador__proyectos">
                    <h4>Proyectos</h4>
                    <p>Asignados: {prueba.proyectosAsignados}</p>
                    <p>Pendientes de evaluación: {prueba.pendientesEvaluacion}</p>
                </div>
                
                <div className="dashboard-evaluador__tabla">
                    <SmallTable title="Proyectos Activos" data={data.proyectos} viewPath={'/proyecto'}/>
                </div>
                


                
            </div>


            }
            </Card>
            
            
        </div>
    )

}

export default DashboardEvaluador