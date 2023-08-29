// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useParams } from "react-router-dom"

// components
import ActualizarProyectoForm from "../../components/Projects/ActualizarProyectoForm"
import Spinner from "../../components/Spinner/Spinner"
import ProgressBar from "../../components/ProgressBar/ProgressBar"

import { ETAPAS } from "../../components/Projects/ActualizarProyectoForm"
import { useState } from "react"

const ActualizarProyecto = () => {
    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { data } = useAxiosFetch(`/proyecto/${id}`, axiosPrivate)

    const [etapaActual, setEtapaActual] = useState(ETAPAS.Escolar)

    const getEtapa = (etapa) => {
        setEtapaActual(etapa)
    }


    return (
        <>
            {!data ? <Spinner/> : 
            
            <>
                <ProgressBar etapas={ETAPAS} etapaActual={etapaActual}/>
                <ActualizarProyectoForm formData={data.proyecto} getEtapa={getEtapa}/>  
            </>
            
            
            
            
            }
        </>
    )

}

export default ActualizarProyecto