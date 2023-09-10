// components
import PostulacionDocenteForm from "../../components/Postulacion/PostulacionDocenteForm"
import Button from "../../components/Button/Button"
// hooks
import { useState } from "react"
const Postulacion = () => {

    const [isDocente, setIsDocente] = useState(null)
    return (
        <>
            {isDocente === null && (
            <div className='edit-project-form__button'>
                <h2>¿Sos docente o investigador?</h2>
                <Button 
                    text='Docente' 
                    onClickHandler={() => setIsDocente(true)}
                    activo={true}
                />
                <Button 
                    text='Investigador' 
                    onClickHandler={() => setIsDocente(false)}
                    activo={true}
                />
            </div>)}
            {isDocente !== null && (<PostulacionDocenteForm isDocente={isDocente}/>)}
        </>
    )

}

export default Postulacion