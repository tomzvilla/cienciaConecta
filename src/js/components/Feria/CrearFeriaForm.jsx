// components
import DatosFeriaForm from "./DatosFeriaForm"

// hooks
import { useState } from "react";
import { useFormValidator } from "../../hooks/useFormValidator";

export const ETAPAS = {
    Datos: '1',
    Instancias: '2',
    Sedes: '3',
    Criterios: '4',
  };

const CrearFeriaForm = () => {
    const [formValues, setFormValues] = useState({
        nombreFeria: '',
        descripcionFeria: '',
        logo: '',
        fechaInicioFeria: '',
        fechaFinFeria: '',
    })

    const [etapaActual, setEtapaActual] = useState(ETAPAS.Datos)

     
    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

    const cambiarVista = (e) => {
        e.preventDefault()
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        const nextFormValueState = {
            ...formValues,
            [name]: value
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty) {
            validateForm({form: nextFormValueState, errors, name})
        }
    }

    const handleFileChange = (e) => {
        const {name} = e.target
        const file = e.target.files[0]
        const nextFormValueState = {
            ...formValues,
            [name]: file
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty) {
            validateForm({form: nextFormValueState, errors, name})
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})

        if(!isValid) return

        try {
            console.log('Entro al try')
            
        } catch (err) {
            if(!err?.response){
                console.log('El servidor no respondio')
            } else if(err.response?.status === 403) {
                console.log('Datos incorrectos intente nuevamente')
            } else if(err.response?.status === 401) {
                console.log('No estas autorizado para realizar esta operacion')
            } else {
                console.log('Fallo la creación de la feria')
            }
        }
            
        console.log('Se mando XD')
    }

    const handleDelete = async (e) => {
        try {
            e.preventDefault()
        } catch (err) {
            console.log(err)
        }
        setTimeout(() => { }, 2000);
    }

    const handleVolver = (e) => {
        e.preventDefault()
    }
    return (
        <form className='edit-project-form'>
            <h2 className='edit-project-form__title'> Registrar Feria de Ciencias y Tecnologia </h2>
            <DatosFeriaForm
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                onBlurField={onBlurField}
                formValues={formValues}
                errors={errors}
            />
        </form>
    )
}

export default CrearFeriaForm