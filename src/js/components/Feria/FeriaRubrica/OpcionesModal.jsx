// components
import AddOpcion from "./AddOpcion"
import Table from "../../Table/Table"

// hooks
import { useState } from "react"
import { useFormValidator } from "../../../hooks/useFormValidator"

const OpcionesModal = (props) => {

    const { rubrica, criterio, formValues, setFormValues, cerrarModal } = props 
    const [opcion, setOpcion] = useState({
        'nombreOpcion': ""
    })

    const { validateForm, onBlurField, errors} = useFormValidator(opcion)
    

    const headers = [
        {name: 'Opción', value: 'opciones'},

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
        e.preventDefault()
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
        const nombre = nombreOpcion.opciones

        const prevCriterios = [...formValues.criteriosEvaluacion]
        const rubricaIndex = prevCriterios.findIndex(rubrica => rubrica.nombreRubrica === rubrica.nombreRubrica);
        const criterioIndex = prevCriterios[rubricaIndex].criterios.findIndex(criterio => criterio.nombre === criterio.nombre);
        const opcionIndex =  prevCriterios[rubricaIndex].criterios[criterioIndex].opciones.findIndex(opcion => opcion === nombre)

        prevCriterios[rubricaIndex].criterios[criterioIndex].opciones = prevCriterios[rubricaIndex].criterios[criterioIndex].opciones.filter((_, index) => index !== opcionIndex);
        
        setFormValues({...formValues, criteriosEvaluacion: prevCriterios})
        setOpcion({
            nombreOpcion: '',
        })
    }

    return (
        <div>
            <Table data={criterio?.opciones.map(value => ({ opciones: value }))} headers={headers} callback={handleDeleteOpcion}/>
            <AddOpcion handleChange={handleChange} onBlurField={onBlurField} opcion={opcion} errors={errors} handleAdd={handleSubmit}/>
        </div>
    )

}

export default OpcionesModal