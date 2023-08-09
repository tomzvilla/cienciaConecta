// components
import InputField from "../../InputField/InputField"
import CriteriosTable from "./CriteriosTable"
import Button from "../../Button/Button"

// hooks
import { useState } from "react"
import { useFormValidator } from "../../../hooks/useFormValidator"

const FeriaRubricaCard = (props) => {

    const { rubrica, handleDeleteRubrica, formValues, setFormValues } = props

    const [rubricaValues, setRubricaValues] = useState({
        nombreCriterio: '',
        ponderacion: ''
    })

    const { validateForm, onBlurField, errors} = useFormValidator(rubricaValues)

    const handleSubmit = (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: rubricaValues, errors, forceTouchErrors: true})
        if(!isValid) return
        const prevCriterios = [...formValues.criteriosEvaluacion]
        prevCriterios.forEach((c =>{
            if(c.nombreRubrica === rubrica.nombreRubrica) c.criterios.push({
                nombre: rubricaValues.nombreCriterio,
                ponderacion: rubricaValues.ponderacion,
                opciones: [],
            })
        }))
        setFormValues({...formValues, criteriosEvaluacion: prevCriterios})
        setRubricaValues({
            nombreCriterio: '',
            ponderacion: ''
        })
        
    }

    const handleDeleteCriterio = (e, nombreCriterio) => {
        e.preventDefault()
        const prevCriterios = [...formValues.criteriosEvaluacion]
        const rubricaIndex = prevCriterios.findIndex(rubrica => rubrica.nombreRubrica === rubrica.nombreRubrica);
        const criterioIndex = prevCriterios[rubricaIndex].criterios.findIndex(criterio => criterio.nombre === nombreCriterio);
      
        prevCriterios[rubricaIndex].criterios = prevCriterios[rubricaIndex].criterios.filter((_, index) => index !== criterioIndex);
        
        setFormValues({...formValues, criteriosEvaluacion: prevCriterios})
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
            <CriteriosTable rubrica={rubrica} handleDeleteCriterio={handleDeleteCriterio} formValues={formValues}  setFormValues={setFormValues}/>
            <button onClick={handleDeleteRubrica}> Borrar </button>
            <div className='edit-project-form__input'>
                <InputField
                    label='Criterio: ' 
                    name='nombreCriterio'
                    type={'text'}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={rubricaValues.nombreCriterio}
                    errors={errors.nombreCriterio}
                    required={true}
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
                    required={true}
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