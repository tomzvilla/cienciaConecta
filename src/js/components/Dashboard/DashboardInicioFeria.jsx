// components
import DashboardCard from "./DashboardCard"
import imagenProyecto from "../../../assets/atomic_PLACEHOLDER.png"
import imagenEvaluador from "../../../assets/evaluador_PLACEHOLDER.png"

const DashboardInicioFeria = (props) => {
    console.log('custom dashboard')
    return (
        <div className="dashboard-inicio-feria">
            <p className="dashboard-inicio-feria__text"> A continuación, elegí cómo querés empezar: </p>
            <DashboardCard 
                src={imagenProyecto}
                title={'Inscribí tu proyecto'}
                link={'/inscribirProyecto'}
            />
            <DashboardCard 
                src={imagenEvaluador}
                title={'Postulate como evaluador'}
                link={'/postulacion'}
            />
        </div>
    )

}

export default DashboardInicioFeria