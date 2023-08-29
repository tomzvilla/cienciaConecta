// components
import { useState } from 'react'
import CrearFeriaForm from '../../components/Feria/CrearFeriaForm'

import { ETAPAS } from '../../components/Feria/CrearFeriaForm'
import ProgressBar from '../../components/ProgressBar/ProgressBar'

const CrearFeria = () => {
    const [etapaActual, setEtapaActual] = useState(ETAPAS.Datos)

    const getEtapa = (etapa) => {
        setEtapaActual(etapa)
    }

    return (
        <>
            <ProgressBar etapas={ETAPAS} etapaActual={etapaActual}/>
            <CrearFeriaForm getEtapa={getEtapa}/>
        </>
        
    )
}

export default CrearFeria