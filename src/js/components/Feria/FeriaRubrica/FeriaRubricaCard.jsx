// components
import InputField from "../../InputField/InputField"
import CriteriosTable from "./CriteriosTable"
import Button from "../../Button/Button"

// hooks
import { useState } from "react"
import { useFormValidator } from "../../../hooks/useFormValidator"

const FeriaRubricaCard = (props) => {

    const { rubrica, handleDeleteRubrica, formValues, setFormValues, abrirOpciones } = props

    const [rubricaValues, setRubricaValues] = useState({
        nombreCriterio: '',
        ponderacion: ''
    })

    const [sumaPonderacion, setSumaPonderacion ] = useState(0)
 
    const { validateForm, onBlurField, errors} = useFormValidator(rubricaValues)

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
        console.log(sumaPonderada)
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
        console.log(parseFloat(sumaPonderada).toFixed(3))
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

    return (
        <div>
            <h2>{rubrica.nombreRubrica}</h2>
            <CriteriosTable abrirOpciones={abrirOpciones} rubrica={rubrica} handleDeleteCriterio={handleDeleteCriterio} formValues={formValues}  setFormValues={setFormValues}/>
            <button onClick={handleDeleteRubrica}> Borrar </button>
            {rubrica.criterios.length >= 1 && sumaPonderacion !== parseFloat('1').toFixed(3) ? <p>La suma de la ponderación de los criterios debe dar 1</p> : null}
            <div className='edit-project-form__input'>
                <InputField
                    label='Criterio: ' 
                    name='nombreCriterio'
                    type={'text'}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={rubricaValues.nombreCriterio}
                    errors={errors.nombreCriterio}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Ponderacion: ' 
                    name='ponderacion'
                    type={'number'}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={rubricaValues.ponderacion}
                    errors={errors.ponderacion}
                />
            </div>
            <Button 
                text={'Agregar'} 
                onClickHandler={handleSubmit} 
                activo={true}
            />
        </div>
    )
}

export default FeriaRubricaCard