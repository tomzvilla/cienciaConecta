// components
import PostulacionDocenteForm from "../../components/Postulacion/PostulacionDocenteForm"
import Metadata from "../../components/Metadata/Metadata"
// hooks
import { useState } from "react"
import DocenteEvaluadorCard from "./DocenteEvaluadorCard"
const Postulacion = () => {

    const [isDocente, setIsDocente] = useState(null)
    return (
        <>
            <Metadata title={'Postularme como Evaluador'}/>
            {isDocente === null && <DocenteEvaluadorCard setIsDocente={setIsDocente} />}
            {isDocente !== null && (<PostulacionDocenteForm isDocente={isDocente}/>)}
        </>
    )

}

export default Postulacion