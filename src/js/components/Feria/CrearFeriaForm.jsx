// components
import DatosFeriaForm from "./DatosFeriaForm"
import InstanciasFeriaForm from "./InstanciasFeriaForm";
import SedesFeriaForm from "./SedesFeriaForm";
import Button from "../Button/Button";
import SedeProvincialForm from "./SedeProvincialForm";
import RubricasFeriaForm from "./RubricasFeriaForm";
// hooks
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormValidator } from "../../hooks/useFormValidator";

export const ETAPAS = {
    Datos: '1',
    Instancias: '2',
    SedesRegionales: '3',
    SedeProvincial: '4',
    Criterios: '5',
  };

const CrearFeriaForm = () => {
    const [formValues, setFormValues] = useState({
        nombreFeria: '',
        descripcionFeria: '',
        logo: '',
        fechaInicioFeria: '',
        fechaFinFeria: '',
        fechaInicioInstanciaEscolar: '',
        fechaFinInstanciaEscolar: '',
        fechaInicioEvaluacionRegional: '',
        fechaFinEvaluacionRegional: '',
        fechaInicioExposicionRegional: '',
        fechaFinExposicionRegional: '',
        fechaInicioEvaluacionProvincial: '',
        fechaFinEvaluacionProvincial: '',
        departamento: '',
        localidad: '',
        establecimientos: [],
        cupos: [],
        sedeProvincialDpto: '',
        sedeProvincialLocalidad: '',
        sedeProvincial: null,
        cuposProvincial: [],
        criteriosEvaluacion: [],
        nombreRubrica: '',
    })

    const [etapaActual, setEtapaActual] = useState(ETAPAS.SedesRegionales)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/myprojects'
     
    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

    const cambiarVista = (e) => {
        e.preventDefault()
        console.log(formValues)
        let fieldsToExclude = []
        if(etapaActual === ETAPAS.Datos) fieldsToExclude = ['fechaInicioInstanciaEscolar', 'fechaFinInstanciaEscolar','fechaInicioEvaluacionRegional', 'fechaFinEvaluacionRegional', 'fechaInicioExposicionRegional', 'fechaFinExposicionRegional', 'fechaInicioEvaluacionProvincial',  'fechaFinEvaluacionProvincial']
        if(etapaActual === ETAPAS.Instancias) fieldsToExclude = []
        if(etapaActual === ETAPAS.SedesRegionales) setEtapaActual(ETAPAS.SedeProvincial) // borrar despues, solo para pruebas
        if(etapaActual === ETAPAS.SedeProvincial) setEtapaActual(ETAPAS.Criterios) // borrar despues, solo para pruebas
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true, fieldsToExclude: fieldsToExclude})
        if(etapaActual === ETAPAS.Datos & isValid) setEtapaActual(ETAPAS.Instancias)
        if(etapaActual === ETAPAS.Instancias & isValid) setEtapaActual(ETAPAS.SedesRegionales)
        if(etapaActual === ETAPAS.SedesRegionales & isValid) setEtapaActual(ETAPAS.SedeProvincial)
        if(etapaActual === ETAPAS.SedeProvincial & isValid) setEtapaActual(ETAPAS.Criterios)
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
        console.log(file)
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
        if(etapaActual === ETAPAS.SedesRegionales) setEtapaActual(ETAPAS.Instancias)
        if(etapaActual === ETAPAS.SedeProvincial) setEtapaActual(ETAPAS.SedesRegionales)
        if(etapaActual === ETAPAS.Criterios) setEtapaActual(ETAPAS.SedeProvincial)
    }

    const handleDeleteSede = (nombreSede) => {
        setFormValues({...formValues, establecimientos: formValues.establecimientos.filter(obj => obj.nombre !== nombreSede)})
    }

    const handleDeleteSedeProvincial = () => {
        setFormValues({...formValues, sedeProvincial: null})
        console.log(formValues.sedeProvincial)
    }

    const handleAddRubrica = (rubrica) => {
        // crear objeto 
        const newRubrica = {
            nombreRubrica: rubrica.nombre,
            criterios: [],
        }
        setFormValues({...formValues, criteriosEvaluacion: [...formValues.criteriosEvaluacion, newRubrica]})
        console.log(formValues.criteriosEvaluacion)
    }

    const handleDeleteRubrica = (nombreRubrica) => {
        setFormValues({
            ...formValues, 
            nombreRubrica: '',
            criteriosEvaluacion: formValues.criteriosEvaluacion.filter(r => r.nombreRubrica !== nombreRubrica)
        })
    }

    return (
        <form className='crear-feria-form'>
            <h2 className='crear-feria-form__title'> Registrar Feria de Ciencias y Tecnologia </h2>
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
            {etapaActual === ETAPAS.SedesRegionales && <SedesFeriaForm
                handleChange={handleChange}
                handleDeleteSede={handleDeleteSede}
                onBlurField={onBlurField}
                formValues={formValues}
                setFormValues={setFormValues}
                errors={errors}
            />}
            {etapaActual === ETAPAS.SedeProvincial && <SedeProvincialForm
                handleChange={handleChange}
                handleDeleteSedeProvincial={handleDeleteSedeProvincial}
                onBlurField={onBlurField}
                formValues={formValues}
                setFormValues={setFormValues}
                errors={errors}
            />}
            {etapaActual === ETAPAS.Criterios && <RubricasFeriaForm 
                handleChange={handleChange}
                onBlurField={onBlurField}
                formValues={formValues}
                handleAddRubrica={handleAddRubrica}
                handleDeleteRubrica={handleDeleteRubrica}
                setFormValues={setFormValues}
                errors={errors}
            />}
            <div className='crear-feria-form__button'>
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