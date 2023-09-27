// components
import { useState } from 'react'
import CrearFeriaForm from '../../components/Feria/CrearFeriaForm'
import Metadata from '../../components/Metadata/Metadata'
import { ETAPAS } from '../../components/Feria/CrearFeriaForm'
import ProgressBar from '../../components/ProgressBar/ProgressBar'

const CrearFeria = () => {
    const [etapaActual, setEtapaActual] = useState(ETAPAS.Datos)

    const getEtapa = (etapa) => {
        setEtapaActual(etapa)
    }

    return (
        <>
            <Metadata title={'Feria'}/>
            <ProgressBar etapas={ETAPAS} etapaActual={etapaActual}/>
            <CrearFeriaForm getEtapa={getEtapa}/>
        </>
        
    )
}

export default CrearFeria