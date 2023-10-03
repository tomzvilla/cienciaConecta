// components
import Card from "../Card/Card"
import Spinner from "../Spinner/Spinner"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"


const DashboardEvaluador= () => {
    const axiosPrivate = useAxiosPrivate()

    // Poner consulta de endpoint
    //const {data} = useAxiosFetch('/endpoint', axiosPrivate)

    const data = {
        nombreInstancia: 'Regional',
        fechaFin: '16/10/23',
        proyectosAsignados: 3,
        pendientesEvaluacion: 2,
    }


    return (
        <div>
            {!data ? 
            <Spinner/> 
            : 
            <Card title={'Dashboard'}>
                <p>Proxima instancia: {data.nombreInstancia}</p>
                <p>Fin instancia {data.nombreInstancia}: {data.fechaFin}</p>
                <h4>Proyectos</h4>
                <p>Asignados: {data.proyectosAsignados}</p>
                <p>Pendientes de evaluacion: {data.pendientesEvaluacion}</p>
            </Card>
            }
            
        </div>
    )

}

export default DashboardEvaluador