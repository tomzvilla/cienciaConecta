// components
import DatosFeriaForm from "./DatosFeriaForm"
import InstanciasFeriaForm from "./InstanciasFeriaForm";
import Button from "../Button/Button";
// hooks
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
        fechaInicioInstanciaEscolar: null,
        fechaFinInstanciaEscolar: null,
        fechaInicioEvaluacionRegional: null,
        fechaFinEvaluacionRegional: null,
        fechaInicioExposicionRegional: null,
        fechaFinExposicionRegional: null,
        fechaInicioEvaluacionProvincial: null,
        fechaFinEvaluacionProvincial: null,
    })

    const [etapaActual, setEtapaActual] = useState(ETAPAS.Datos)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/myprojects'

     
    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

    const cambiarVista = (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})
        if(etapaActual === ETAPAS.Datos & isValid) setEtapaActual(ETAPAS.Instancias)
        if(etapaActual === ETAPAS.Instancias & isValid) setEtapaActual(ETAPAS.Sedes)
        if(etapaActual === ETAPAS.Sedes & isValid) setEtapaActual(ETAPAS.Criterios)
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
        if(etapaActual === ETAPAS.Datos){
            navigate(from, { replace: true })
        }
        if(etapaActual === ETAPAS.Instancias) setEtapaActual(ETAPAS.Datos)
        if(etapaActual === ETAPAS.Sedes) setEtapaActual(ETAPAS.Instancias)
        if(etapaActual === ETAPAS.Criterios) setEtapaActual(ETAPAS.Sedes)
    }
    return (
        <form className='edit-project-form'>
            <h2 className='edit-project-form__title'> Registrar Feria de Ciencias y Tecnologia </h2>
            {etapaActual === ETAPAS.Datos && <DatosFeriaForm
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                onBlurField={onBlurField}
                formValues={formValues}
                errors={errors}
            />}
            {etapaActual === ETAPAS.Instancias && <InstanciasFeriaForm
                handleChange={handleChange}
                onBlurField={onBlurField}
                formValues={formValues}
                errors={errors}
            />}
            {etapaActual === ETAPAS.Sedes && <p>Sedes</p>}
            {etapaActual === ETAPAS.Criterios && <p>Criterios</p>}
            <div className='edit-project-form__button'>
                <Button 
                    text='Volver' 
                    onClickHandler={handleVolver}
                />
                {etapaActual !== ETAPAS.Criterios && <Button 
                    text={'Continuar'} 
                    onClickHandler={cambiarVista} activo={true}
                />}
                {etapaActual === ETAPAS.Criterios && <Button 
                    text={'Registrar'} 
                    onClickHandler={handleSubmit} activo={true}
                />}
            </div>
        </form>
    )
}

export default CrearFeriaForm