// components
import InputField from "../../InputField/InputField"
import Button from "../../Button/Button"
import OpcionesTable from "./OpcionesTable"
import AddOpcion from "./AddOpcion"
import Table from "../../Table/Table"

// hooks
import { useState } from "react"
import { useFormValidator } from "../../../hooks/useFormValidator"

const OpcionesModal = (props) => {

    const { rubrica, criterio, formValues, setFormValues, cerrarModal } = props 
    const [opcion, setOpcion] = useState({
        nombreOpcion: ''
    })

    const { validateForm, onBlurField, errors} = useFormValidator(opcion)


    const headers = [
        {name: 'Criterio', value: 'criterio'},

      ]

    const handleSubmit = (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: opcion, errors, forceTouchErrors: true})
        if(!isValid) return
        const prevCriterios = [...formValues.criteriosEvaluacion]
        const rubricaIndex = prevCriterios.findIndex(rbr => rbr.nombreRubrica === rubrica?.nombreRubrica);
        const criterioIndex = prevCriterios[rubricaIndex]?.criterios.findIndex(crit => crit.nombre === criterio.nombre);
        prevCriterios[rubricaIndex]?.criterios[criterioIndex].opciones.push(opcion.nombreOpcion)

        setFormValues({...formValues, criteriosEvaluacion: prevCriterios})
        setOpcion({
            nombreOpcion: '',
        })
        cerrarModal()
        
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

    const handleDeleteOpcion = (e, nombreOpcion) => {
        e.preventDefault()
        const prevCriterios = [...formValues.criteriosEvaluacion]
        const rubricaIndex = prevCriterios.findIndex(rubrica => rubrica.nombreRubrica === rubrica.nombreRubrica);
        const criterioIndex = prevCriterios[rubricaIndex].criterios.findIndex(criterio => criterio.nombre === criterio.nombre);
        const opcionIndex =  prevCriterios[rubricaIndex].criterios[criterioIndex].opciones.findIndex(opcion => opcion === nombreOpcion)

        prevCriterios[rubricaIndex].criterios[criterioIndex].opciones = prevCriterios[rubricaIndex].criterios[criterioIndex].opciones.filter((_, index) => index !== opcionIndex);
        
        setFormValues({...formValues, criteriosEvaluacion: prevCriterios})
        setOpcion({
            nombreOpcion: '',
        })
    }

    return (
        <div>
            {/* <OpcionesTable handleDeleteOpcion={handleDeleteOpcion} criterio={criterio} />
            <InputField
                label='Nombre: ' 
                name='nombreOpcion'
                type={'text'}
                onChange={handleChange}
                onBlur={onBlurField}
                value={opcion.nombreOpcion}
                errors={errors.nombreOpcion}
            />
            <Button 
                text={'Agregar'} 
                onClickHandler={handleSubmit} 
                activo={true}
            /> */}

            <Table data={criterio?.opciones} headers={headers} callback={handleDeleteOpcion}/>
            <AddOpcion handleChange={handleChange} onBlurField={onBlurField} opcion={opcion} errors={errors} handleAdd={handleSubmit}/>
        </div>
    )

}

export default OpcionesModal