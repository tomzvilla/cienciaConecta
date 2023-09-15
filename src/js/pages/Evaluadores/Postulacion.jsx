// components
import PostulacionDocenteForm from "../../components/Postulacion/PostulacionDocenteForm"
import Button from "../../components/Button/Button"
// hooks
import { useState } from "react"
import DocenteEvaluadorCard from "./DocenteEvaluadorCard"
const Postulacion = () => {

    const [isDocente, setIsDocente] = useState(null)
    return (
        <>
            {isDocente === null && <DocenteEvaluadorCard setIsDocente={setIsDocente} />}
            {isDocente !== null && (<PostulacionDocenteForm isDocente={isDocente}/>)}
        </>
    )

}

export default Postulacion