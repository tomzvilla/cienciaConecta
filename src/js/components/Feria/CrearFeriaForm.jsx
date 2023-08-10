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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
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
        fechaInicioPostulacionEvaluadores: '',
        fechaFinPostulacionEvaluadores: '',
        fechaInicioAsignacionProyectos: '',
        fechaFinAsignacionProyectos: '',
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
        errorSumaPonderacion: false,
        errorRubrica:  false,
    })

    const [etapaActual, setEtapaActual] = useState(ETAPAS.Datos)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/myprojects'
     
    const {errors, validateForm, onBlurField} = useFormValidator(formValues)
    const axiosPrivate = useAxiosPrivate()

    const cambiarVista = (e) => {
        e.preventDefault()
        console.log(formValues)
        let fieldsToExclude = []
        if(etapaActual === ETAPAS.Datos) fieldsToExclude = ['fechaInicioInstanciaEscolar', 'fechaFinInstanciaEscolar','fechaInicioEvaluacionRegional', 'fechaFinEvaluacionRegional', 'fechaInicioExposicionRegional', 'fechaFinExposicionRegional', 
        'fechaInicioEvaluacionProvincial',  'fechaFinEvaluacionProvincial', 'fechaInicioPostulacionEvaluadores', 'fechaFinPostulacionEvaluadores', 'fechaInicioAsignacionProyectos','fechaFinAsignacionProyectos', 'cupos', 'criteriosEvaluacion', 'nombreRubrica']
        if(etapaActual === ETAPAS.Instancias) fieldsToExclude = ['cupos', 'criteriosEvaluacion', 'nombreRubrica']
        if(etapaActual === ETAPAS.SedesRegionales) fieldsToExclude = ['criteriosEvaluacion', 'nombreRubrica']
        if(etapaActual === ETAPAS.SedeProvincial) fieldsToExclude = ['criteriosEvaluacion', 'nombreRubrica']
        if(etapaActual === ETAPAS.Criterios) fieldsToExclude = []
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

    const handleDateChange = (e) => {
        const {name, value} = e.target
        let fecha = new Date(value)
        if(name.includes('Fin')) {
            fecha.setHours(23,59,59)
        }
        const nextFormValueState = {
            ...formValues,
            [name]: fecha.toISOString()
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty) {
            validateForm({form: nextFormValueState, errors, name})
        }
    }

    const validarCriteriosEvaluacion = (criteriosEvaluacion) => {
        let errorMessage = ''
        criteriosEvaluacion.forEach(rubrica => {
            if(rubrica.criterios.length === 0){
                errorMessage = `La rúbrica ${rubrica.nombreRubrica} debe tener al menos 1 criterio`
                return
            }

        })

        if(errorMessage !== '') return errorMessage

        criteriosEvaluacion.forEach(rubrica => {
            rubrica.criterios.forEach(criterio => {
                if(criterio.opciones.length < 2) {
                    errorMessage = `El criterio ${criterio.nombre} de la rúbrica ${rubrica.nombreRubrica} debe tener al menos 2 opciones`
                    return
                }
            })
        })

        return errorMessage

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})

        if(!isValid) return
        if(formValues.errorSumaPonderacion) return
        const messageError = validarCriteriosEvaluacion(formValues.criteriosEvaluacion)
        if(messageError !== '') {
            console.log(messageError)
            return
        }
        console.log(formValues.errorSumaPonderacion)

        try {
            console.log('Entro al try')
            const { 
                nombreFeria, 
                descripcionFeria, 
                logo, 
                fechaInicioFeria, 
                fechaFinFeria, 
                fechaInicioInstanciaEscolar, 
                fechaFinInstanciaEscolar, 
                fechaInicioEvaluacionRegional,
                fechaFinEvaluacionRegional,
                fechaInicioExposicionRegional,
                fechaFinExposicionRegional,
                fechaInicioEvaluacionProvincial,
                fechaFinEvaluacionProvincial,
                fechaInicioPostulacionEvaluadores,
                fechaFinPostulacionEvaluadores,
                fechaInicioAsignacionProyectos,
                fechaFinAsignacionProyectos,
                cupos,
                sedeProvincial,
                cuposProvincial,
                criteriosEvaluacion,
             } = formValues
            const sedesRegional = new Set(cupos.map(c => { 
                return c.sede
            }))
            console.log(sedesRegional)
            const response = await axiosPrivate.post('/feria', 
            JSON.stringify({ 
                nombre: nombreFeria, 
                descripcion: descripcionFeria, 
                logo: 'www.logo.com', 
                fechaInicioFeria: fechaInicioFeria, 
                fechaFinFeria: fechaFinFeria, 
                instancias: {
                    instanciaEscolar: {
                        fechaInicioInstancia: fechaInicioInstanciaEscolar,
                        fechaFinInstancia: fechaFinInstanciaEscolar,
                    },
                    instanciaRegional: {
                        fechaInicioEvaluacionTeorica: fechaInicioEvaluacionRegional,
                        fechaFinEvaluacionTeorica: fechaFinEvaluacionRegional,
                        fechaInicioEvaluacionPresencial: fechaInicioExposicionRegional,
                        fechaFinEvaluacionPresencial: fechaFinExposicionRegional,
                        cupos,
                        sedes: Array.from(sedesRegional)
                    },
                    instanciaProvincial: {
                        fechaInicioEvaluacionPresencial: fechaInicioEvaluacionProvincial,
                        fechaFinEvaluacionPresencial: fechaFinEvaluacionProvincial,
                        cupos: cuposProvincial,
                        sede: sedeProvincial._id
                    }
                }, 
                fechaInicioPostulacionEvaluadores, 
                fechaFinPostulacionEvaluadores,
                fechaInicioAsignacionProyectos,
                fechaFinAsignacionProyectos,
                criteriosEvaluacion,
            }),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
            )
            console.log(JSON.stringify(response?.data))

            setFormValues({
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
                fechaInicioPostulacionEvaluadores: '',
                fechaFinPostulacionEvaluadores: '',
                fechaInicioAsignacionProyectos: '',
                fechaFinAsignacionProyectos: '',
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
            
        } catch (err) {
            console.log(err)
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
        <form className='edit-project-form'>
            <h2 className='edit-project-form__title'> Registrar Feria de Ciencias y Tecnologia </h2>
            {etapaActual === ETAPAS.Datos && <DatosFeriaForm
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                handleFileChange={handleFileChange}
                onBlurField={onBlurField}
                formValues={formValues}
                errors={errors}
            />}
            {etapaActual === ETAPAS.Instancias && <InstanciasFeriaForm
                handleDateChange={handleDateChange}
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