// components
import Rubrica from "./Rubrica"
import Button from "../Button/Button"
// hooks
import { useState } from "react"

const EvaluacionForm = (props) => {
    
    const {evaluacion} = props

    console.log(evaluacion)

    const order = []
    evaluacion.forEach(e => {
        order.push(e._id)
    })

    const [rubricaActual, setRubricaActual] = useState(order[0])



    return(
        <>
            {evaluacion.map(rubrica => (
                <Rubrica display={rubrica._id === rubricaActual} rubrica={rubrica}/>
            ))}
            <div>
                <Button 
                    text='Volver' 
                    onClickHandler={() => {}}
                />
                <Button 
                    text='Continuar'
                    active={true} 
                    onClickHandler={() => {}}
                />
            </div>
        </>
        

    )

}

export default EvaluacionForm