// components
import InputField from "../../InputField/InputField"
import CriteriosTable from "./CriteriosTable"
import Button from "../../Button/Button"
import ImageButton from "../../ImageButton/ImageButton"

// hooks
import { useState } from "react"
import { useFormValidator } from "../../../hooks/useFormValidator"
import Table from "../../Table/Table"
import NuevoCriterio from "./NuevoCriterio"

const FeriaRubricaCard = (props) => {

    const { rubrica, handleDeleteRubrica, formValues, setFormValues, abrirOpciones } = props

    const [rubricaValues, setRubricaValues] = useState({
        nombreCriterio: '',
        ponderacion: ''
    })

    const [sumaPonderacion, setSumaPonderacion ] = useState(0)
 
    const { validateForm, onBlurField, errors} = useFormValidator(rubricaValues)

    const headers = [
        {name: 'Criterios', value: 'nombre'},
        {name: 'Ponderación', value: 'ponderacion'},
      ]

    const handleSubmit = (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: rubricaValues, errors, forceTouchErrors: true})
        if(!isValid) return
        const prevCriterios = [...formValues.criteriosEvaluacion]
        let sumaPonderada = 0
        let error = false
        prevCriterios.forEach((r) =>{
            if(r.nombreRubrica === rubrica.nombreRubrica) {
                // if(c.criterios.find(crt => crt.nombre === rubricaValues.nombreCriterio)) {return}
                r.criterios.push({ nombre: rubricaValues.nombreCriterio, ponderacion: Number(rubricaValues.ponderacion), opciones: [],})
                r.criterios.forEach((criterio) => {sumaPonderada += criterio.ponderacion})
            }
        })
        if(parseFloat(sumaPonderada).toFixed(3) !== parseFloat('1').toFixed(3) ) error = true 
        setSumaPonderacion(parseFloat(sumaPonderada).toFixed(3))
        setFormValues({...formValues, criteriosEvaluacion: prevCriterios, errorSumaPonderada: error})
        setRubricaValues({
            nombreCriterio: '',
            ponderacion: ''
        })
        
    }

    const handleDeleteCriterio = (e, nombreCriterio) => {
        e.preventDefault()
        const prevCriterios = [...formValues.criteriosEvaluacion]
        const rubricaIndex = prevCriterios.findIndex(rbr => rbr.nombreRubrica === rubrica.nombreRubrica);
        const criterioIndex = prevCriterios[rubricaIndex].criterios.findIndex(criterio => criterio.nombre === nombreCriterio);
      
        prevCriterios[rubricaIndex].criterios = prevCriterios[rubricaIndex].criterios.filter((_, index) => index !== criterioIndex);

        let sumaPonderada = 0
        let error = false
        prevCriterios[rubricaIndex].criterios.forEach(c => {
            sumaPonderada += c.ponderacion
        })

        if(parseFloat(sumaPonderada).toFixed(3) !== parseFloat('1').toFixed(3) ) error = true
        setSumaPonderacion(parseFloat(sumaPonderada).toFixed(3))
        
        setFormValues({...formValues, criteriosEvaluacion: prevCriterios, errorSumaPonderada: error})
        setRubricaValues({
            nombreCriterio: '',
            ponderacion: ''
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        const nextRubricaValue = {
            ...rubricaValues,
            [name]: value
        }
        setRubricaValues(nextRubricaValue)
        if (errors[name].dirty) {
            validateForm({form: nextRubricaValue, errors, name})
        }
    }

    const handleBorrar = (e) => {
        const nombre = e.target.parentNode.parentNode.parentNode.children[0].firstChild.data
        e.preventDefault()
        handleDeleteCriterio(e, nombre)
    }

    const handleBorrarRubrica = (e) => {
        const nombre = e.target.parentNode.parentNode.firstChild.innerText
        //const nombre = e.target.parentNode.parentNode.parentNode.children[0].firstChild.data
        e.preventDefault()
        handleDeleteRubrica(e, nombre)
    }

    return (
        <div className="feria-rubrica-card">
            
            <div className="feria-rubrica-card__header">
                <h2 >{rubrica.nombreRubrica}</h2>
                <ImageButton
                    alt="Eliminar Rúbrica"
                    callback={handleBorrarRubrica} 
                    src={require("../../../../assets/cancel.png")}
                    small={true}
                />
            </div>
            
            <div className="feria-rubrica-card__table-container">
                <Table
                    modal={abrirOpciones}
                    modalTitle="Opciones"
                    callback={handleBorrar}
                    headers={headers}
                    data={rubrica.criterios}
                />
            </div>

            

            
            {rubrica.criterios.length >= 1 && sumaPonderacion !== parseFloat('1').toFixed(3) ? 
            <p className="feria-rubrica-card__error">La suma de la ponderación de los criterios debe dar 1</p> : null}


            <div className="feria-rubrica-card__nuevo-container">
                <NuevoCriterio
                    handleSubmit={handleSubmit} handleChange={handleChange} 
                    onBlurField={onBlurField} nombreCriterio={rubricaValues.nombreCriterio} 
                    ponderacion={rubricaValues.ponderacion}
                    errors={errors}
                />


            </div>
            
            
        </div>
    )
}

export default FeriaRubricaCard