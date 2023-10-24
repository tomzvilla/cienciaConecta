// components
import DatosFeriaForm from "./DatosFeriaForm"
import InstanciasFeriaForm from "./InstanciasFeriaForm";
import SedesFeriaForm from "./SedesFeriaForm";
import Button from "../Button/Button";
import SedeProvincialForm from "./SedeProvincialForm";
import RubricasFeriaForm from "./RubricasFeriaForm";
// hooks
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormValidator } from "../../hooks/useFormValidator";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

import Swal from 'sweetalert2'
import Card from "../Card/Card";

export const ETAPAS = {
    Datos: '1',
    Instancias: '2',
    SedesRegionales: '3',
    SedeProvincial: '4',
    Criterios: '5',
  };

const CrearFeriaForm = (props) => {
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
        errorSumaPonderacion: false,
        errorRubrica:  false,
    })

    const criteriosEvaluacionAlmacenados = useSelector(state => state.feria.rubricas)

    const [etapaActual, setEtapaActual] = useState(ETAPAS.Datos)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/dashboard'
     
    const {errors, validateForm, onBlurField} = useFormValidator(formValues)
    const axiosPrivate = useAxiosPrivate()


    useEffect(() => {
        props.getEtapa(etapaActual)
    }, [etapaActual])



    const cambiarVista = (e) => {
        e.preventDefault()
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
        if(etapaActual === ETAPAS.SedesRegionales & isValid) {
            setFormValues({
                ...formValues,
                departamento: '',
                localidad: '',
            })
            setEtapaActual(ETAPAS.SedeProvincial)
        }
        if(etapaActual === ETAPAS.SedeProvincial & isValid){
            setFormValues({
                ...formValues,
                sedeProvincialDpto: '',
                sedeProvincialLocalidad: '',
            })
            setEtapaActual(ETAPAS.Criterios)
        } 
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

    // convertir fecha a la timezone 

    const dateWithTimezone = (date) => {
        let offsetUTC = date.getTimezoneOffset()
        date.setMinutes(date.getMinutes() - offsetUTC)
        offsetUTC = {
            // positive sign unless offset is at least -00:30 minutes:
            "s": offsetUTC < 30 ? '+' : '-',
            // local time offset in unsigned hours:
            "h": Math.floor(Math.abs(offsetUTC) / 60),
            // local time offset minutes in unsigned integers:
            "m": ~~Math.abs(offsetUTC) % 60
        };
        offsetUTC = offsetUTC.s + // explicit offset sign
            // unsigned hours in HH, dividing colon:
            ('0'+Math.abs(offsetUTC.h)+':').slice(-3) +
            // minutes are represented as either 00 or 30:
            ('0'+(offsetUTC.m < 30 ? 0 : 30)).slice(-2);
        
        return date.toISOString().replace('Z', offsetUTC)
    }

    const dateWithGMT3 = (date) => {
        let nuevaFecha = date.toISOString().slice(0,22)
        let zonaHoraria = "-03:00"
        return nuevaFecha + zonaHoraria
    }

    const handleDateChange = (e) => {
        const {name, value} = e.target
        let fecha = new Date(value)
        
        if(name.includes('Fin')) {
            fecha.setHours(44,59,59,59)
        } else {
            // fecha.setHours(0,0,0,0)
        }
        const nextFormValueState = {
            ...formValues,
            [name]: dateWithGMT3(fecha)
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty) {
            validateForm({form: nextFormValueState, errors, name})
        }
    }

    const validarCriteriosEvaluacion = (criteriosEvaluacion) => {
        let errorMessage = ''
        criteriosEvaluacionAlmacenados.forEach(rubrica => {
            if(rubrica.criterios.length === 0){
                errorMessage = `La rúbrica ${rubrica.nombreRubrica} debe tener al menos 1 criterio`
                return
            }

        })

        if(errorMessage !== '') return errorMessage

        criteriosEvaluacionAlmacenados.forEach(rubrica => {
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
            Swal.fire({
                text: messageError,
                title: 'Falló el registro de la feria',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
            return
        }

        Swal.fire({
            title: '¿Deseas registrar una nueva feria?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Registrar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await registrarFeria()
                if(success) Swal.fire({
                    title: 'Feria Registrada!',
                    text: 'Registraste una feria con éxito',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
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
                        navigate(from, {replace: true, state: {newRol:'2', from:'/feria'}})
                        
                    }
                })
            }
        })
        const registrarFeria = async () => {
            try {
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
                    establecimientos,
                    cupos,
                    sedeProvincial,
                    cuposProvincial,
                } = formValues
                const sedesRegional = new Set(establecimientos.map(e => { 
                    return e._id
                }))
                await axiosPrivate.post('/feria', 
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
                    criteriosEvaluacion: criteriosEvaluacionAlmacenados,
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
                )
                return true
            } catch (err) {
                let msg = ''
                console.log(JSON.stringify(err.response.data))
                if(!err?.response){
                msg = 'El servidor no respondió'
                } else if(err.response?.status === 403) {
                msg = 'Datos incorrectos intente nuevamente'
                } else if(err.response?.status === 401) {
                msg = 'No estas autorizado para realizar esta operación'
                } else {
                msg = `Falló el registro de la feria <br> ${err.response.data.error}`
                }
                Swal.fire({
                    html: msg,
                    title: 'Falló el registro de la feria',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                })
            } 
        }

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
    }

    return (
        <Card title="Registrar Feria de Ciencias y Tecnología" wide={true}>
            <form className='crear-feria-form'>
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
            {etapaActual === ETAPAS.Criterios && <RubricasFeriaForm />}
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

        </Card>


        
    )
}

export default CrearFeriaForm