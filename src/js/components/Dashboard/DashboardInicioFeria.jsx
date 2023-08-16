// components
import DashboardCard from "./DashboardCard"
import imagenProyecto from "../../../assets/atomic_PLACEHOLDER.png"
import imagenEvaluador from "../../../assets/evaluador_PLACEHOLDER.png"

const DashboardInicioFeria = (props) => {

    return (
        <div>
            <p> A continuación, elegí como querés empezar: </p>
            <div>
                <DashboardCard 
                    src={imagenProyecto}
                    title={'Inscribí tu proyecto'}
                    link={'/projects'}
                />
                <DashboardCard 
                    src={imagenEvaluador}
                    title={'Postulate como evaluador'}
                    link={'/postulaciones'}
                />
            </div>
        </div>
    )

}

export default DashboardInicioFeria