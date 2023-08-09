// components
import InputField from "../../InputField/InputField"
import Button from "../../Button/Button"
// hooks
import { useState } from "react"
import { useFormValidator } from "../../../hooks/useFormValidator"
const OpcionesModal = (props) => {

    const { rubrica, criterio, formValues, setFormValues } = props 
    const [opcion, setOpcion] = useState({
        nombreOpcion: ''
    })

    const { validateForm, onBlurField, errors} = useFormValidator(opcion)

    const handleSubmit = (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: opcion, errors, forceTouchErrors: true})
        if(!isValid) return
        const prevCriterios = [...formValues.criteriosEvaluacion]
        const rubricaIndex = prevCriterios.findIndex(rbr => rbr.nombreRubrica === rubrica.nombreRubrica);
        const criterioIndex = prevCriterios[rubricaIndex].criterios.findIndex(crit => crit.nombre === criterio.nombre);
        console.log( prevCriterios[rubricaIndex].criterios[criterioIndex])
        prevCriterios[rubricaIndex].criterios[criterioIndex].opciones.push(opcion.nombreOpcion)
        console.log(prevCriterios)

        setFormValues({...formValues, criteriosEvaluacion: prevCriterios})
        setOpcion({
            nombreOpcion: '',
        })
        
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        const nextOpcion = {
            [name]: value
        }
        setOpcion(nextOpcion)
        if (errors[name].dirty) {
            validateForm({form: nextOpcion, errors, name})
        }
    }

    return (
        <div>
            
            <h2>Datos de la Opción</h2>
            <InputField
                label='Nombre: ' 
                name='nombreOpcion'
                type={'text'}
                onChange={handleChange}
                onBlur={onBlurField}
                value={opcion.nombreOpcion}
                errors={errors.nombreOpcion}
                required={true}
            />
            <Button 
                text={'Agregar'} 
                onClickHandler={handleSubmit} 
                activo={true}
            />
        </div>
    )

}

export default OpcionesModal