// components
import PostulacionDocenteForm from "../../components/Postulacion/PostulacionDocenteForm"
import Metadata from "../../components/Metadata/Metadata"
import BlankState from "../../components/BlankState/BlankState"
import DocenteEvaluadorCard from "./DocenteEvaluadorCard"
import Spinner from "../../components/Spinner/Spinner"
import Card from "../../components/Card/Card"
// hooks
import { useState } from "react"
import { useSelector } from "react-redux"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAuth from "../../hooks/useAuth"
import useUtils from "../../hooks/useUtils"
import { ROLES } from "../../../App"
const Postulacion = () => {

    const [isDocente, setIsDocente] = useState(null)
    const { formatDate } = useUtils()
    const feria = useSelector(state => state.instancias.feria)
    const fecha = new Date()
    const { auth } = useAuth()

    const axiosPrivate = useAxiosPrivate()

    const { isLoading, status, error } = useAxiosFetch('/evaluador/validarPostulacion',axiosPrivate)

    return (
        <>
            <Metadata title={'Postularme como Evaluador'}/>
            { 
            isLoading ?
            <Spinner />
            :
            !feria ?
            <Card title={'Postulación'}><BlankState msg={`No hay ninguna Feria de Ciencias y Tecnología activa en este momento. Podes acceder a nuestros canales oficiales para tener más detalles del calendario.`}/></Card>
            :
            auth?.roles?.find(role => role === ROLES.RefEvaluador ) ?
            <Card title={'Postulación'}><BlankState msg={`Un referente de evaluador no puede postularse como evaluador.`}/></Card>
            :
            status > 399 ?
            <Card title={'Postulación'}><BlankState msg={`No puedes postularte como evaluador \n ${error.response.data.error}`}/></Card>
            :
            fecha >= new Date(feria?.fechas_evaluador.fechaInicioPostulacionEvaluadores) && fecha < new Date(feria?.fechas_evaluador.fechaFinPostulacionEvaluadores) ?
            <>
                {isDocente === null && <DocenteEvaluadorCard setIsDocente={setIsDocente} />}
                {isDocente !== null && (<PostulacionDocenteForm isDocente={isDocente}/>)}
            </>
            :
            fecha <= new Date(feria?.fechas_evaluador.fechaInicioPostulacionEvaluadores) ?
            <Card title={'Postulación'}><BlankState msg={`Todavía no llego la fecha de postulación, por favor esperá hasta el ${formatDate(new Date(feria?.fechas_evaluador.fechaInicioPostulacionEvaluadores))}`}/></Card>
            :
            <Card title={'Postulación'}><BlankState msg={'La fecha de postulación expiró. ¡Esperamos tu participación en la próxima Feria de Ciencias y Tecnología!'}/></Card>
            }
        </>

    )

}

export default Postulacion