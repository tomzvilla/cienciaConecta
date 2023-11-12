// components
import PostulacionDocenteForm from "../../components/Postulacion/PostulacionDocenteForm"
import Metadata from "../../components/Metadata/Metadata"
import BlankState from "../../components/BlankState/BlankState"
import DocenteEvaluadorCard from "./DocenteEvaluadorCard"
import Card from "../../components/Card/Card"
// hooks
import { useState } from "react"
import { useSelector } from "react-redux"
import useUtils from "../../hooks/useUtils"
const Postulacion = () => {

    const [isDocente, setIsDocente] = useState(null)
    const { formatDate } = useUtils()
    const feria = useSelector(state => state.instancias.feria)
    const fecha = new Date()

    return (
        <>
            <Metadata title={'Postularme como Evaluador'}/>
            { !feria ?
            <Card title={'Postulacion'}><BlankState msg={`No hay ninguna Feria de Ciencias y Tecnología activa en este momento. Podes acceder a nuestros canales oficiales para tener más detalles del calendario.`}/></Card>
            :
            fecha >= new Date(feria?.fechas_evaluador.fechaInicioPostulacionEvaluadores) && fecha < new Date(feria?.fechas_evaluador.fechaFinPostulacionEvaluadores) ?
            <>
                {isDocente === null && <DocenteEvaluadorCard setIsDocente={setIsDocente} />}
                {isDocente !== null && (<PostulacionDocenteForm isDocente={isDocente}/>)}
            </>
            :
            fecha <= new Date(feria?.fechas_evaluador.fechaInicioPostulacionEvaluadores) ?
            <Card title={'Postulacion'}><BlankState msg={`La fecha de postulación aún no llegó, por favor esperá hasta el ${formatDate(new Date(feria?.fechas_evaluador.fechaInicioPostulacionEvaluadores))}`}/></Card>
            :
            <Card title={'Postulacion'}><BlankState msg={'La fecha de postulación expiró. Esperamos que participe en la siguiente edición de la Feria de Ciencias y Tecnología.'}/></Card>
            }
        </>

    )

}

export default Postulacion