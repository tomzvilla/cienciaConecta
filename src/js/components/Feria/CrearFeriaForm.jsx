// components
import DatosFeriaForm from "./DatosFeriaForm"
import InstanciasFeriaForm from "./InstanciasFeriaForm";
import SedesFeriaForm from "./SedesFeriaForm";
import CuposPorNivel from './CuposPorNivel'
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
    CuposRegionales: '4',
    SedeProvincial: '5',
    Criterios: '6',
  };

const CrearFeriaForm = (props) => {
    const [formValues, setFormValues] = useState({
        nombreFeria: '',
        descripcionFeria: '',
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
        fechaPromocionInstanciaRegional: '',
        fechaPromocionInstanciaProvincial: '',
        departamento: '',
        localidad: '',
        establecimientos: [],
        cupos: {},
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
        'fechaInicioEvaluacionProvincial',  'fechaFinEvaluacionProvincial', 'fechaInicioPostulacionEvaluadores', 'fechaFinPostulacionEvaluadores', 'fechaInicioAsignacionProyectos','fechaFinAsignacionProyectos', 'fechaPromocionInstanciaRegional', 'fechaPromocionInstanciaProvincial', 'cupos', 'criteriosEvaluacion', 'nombreRubrica']
        if(etapaActual === ETAPAS.Instancias) fieldsToExclude = ['cupos', 'criteriosEvaluacion', 'nombreRubrica']
        if(etapaActual === ETAPAS.SedesRegionales) fieldsToExclude = ['criteriosEvaluacion', 'nombreRubrica']
        if(etapaActual === ETAPAS.CuposRegionales) fieldsToExclude = fieldsToExclude.concat(['criteriosEvaluacion', 'nombreRubrica'])
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
            setEtapaActual(ETAPAS.CuposRegionales)
        }
        if(etapaActual === ETAPAS.CuposRegionales & isValid){
            setEtapaActual(ETAPAS.SedeProvincial)
        } 
        if(etapaActual === ETAPAS.SedeProvincial & isValid){
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

        if(!criteriosEvaluacionAlmacenados.some(r => r.exposicion)) {
            errorMessage = 'Se debe incluir por lo mínimo una rúbrica de exposición'
        }

        if(!criteriosEvaluacionAlmacenados.some(r => !r.exposicion)) {
            errorMessage = 'Se debe incluir por lo mínimo una rúbrica teórica'
        }

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
                            fechaPromocionInstanciaRegional: '',
                            fechaPromocionInstanciaProvincial: '',
                            departamento: '',
                            localidad: '',
                            establecimientos: [],
                            cupos: [],
                            cuposProvincial: [],
                            criteriosEvaluacion: [],
                            nombreRubrica: '',
                        })
                        navigate(from, {replace: true, state: { from:'/feria' }})
                        
                    }
                })
            }
        })
        const registrarFeria = async () => {
            try {
                const { 
                    nombreFeria, 
                    descripcionFeria,
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
                    fechaPromocionInstanciaRegional,
                    fechaPromocionInstanciaProvincial,
                    establecimientos,
                    cupos,
                    cuposProvincial,
                } = formValues
                const cuposPorSede = cupos.porSede.map(c => {
                    if(c.cantidad !== '') return c
                    else {
                        return {
                            sede: c.sede,
                            cantidad: 0,
                        }
                    }
                })
                const sedesRegional = new Set(establecimientos.map(e => { 
                    return e._id
                }))
                await axiosPrivate.post('/feria', 
                JSON.stringify({ 
                    nombre: nombreFeria, 
                    descripcion: descripcionFeria,
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
                            cupos: {
                                porNivel: cupos.porNivel,
                                porSede: cuposPorSede,
                            },
                            sedes: Array.from(sedesRegional),
                            fechaPromocionAProvincial: fechaPromocionInstanciaRegional,
                        },
                        instanciaProvincial: {
                            fechaInicioEvaluacionPresencial: fechaInicioEvaluacionProvincial,
                            fechaFinEvaluacionPresencial: fechaFinEvaluacionProvincial,
                            cupos: cuposProvincial,
                            fechaPromocionANacional: fechaPromocionInstanciaProvincial,
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
        if(etapaActual === ETAPAS.SedesRegionales) {
            setFormValues({
                ...formValues,
                departamento: '',
                localidad: '',
            })
            setEtapaActual(ETAPAS.Instancias)
        }
        if(etapaActual === ETAPAS.CuposRegionales) setEtapaActual(ETAPAS.SedesRegionales)
        if(etapaActual === ETAPAS.SedeProvincial) setEtapaActual(ETAPAS.CuposRegionales)
        if(etapaActual === ETAPAS.Criterios) setEtapaActual(ETAPAS.SedeProvincial)
    }

    const handleDeleteSede = (sede) => {
        setFormValues({
            ...formValues,
            establecimientos: formValues.establecimientos.filter(obj => obj.nombre !== sede.nombre),
            cupos: {
                ...formValues.cupos,
                porSede: formValues.cupos.porSede.filter(obj => obj.sede !== sede._id)
            }
        })
    }


    return (
        <Card title="Registrar Feria de Ciencias y Tecnología" wide={false}>
            <form className='crear-feria-form'>
            {etapaActual === ETAPAS.Datos && <DatosFeriaForm
                handleChange={handleChange}
                handleDateChange={handleDateChange}
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
            {etapaActual === ETAPAS.CuposRegionales && <CuposPorNivel
                formValues={formValues}
                setFormValues={setFormValues}
            />}
            {etapaActual === ETAPAS.SedeProvincial && <SedeProvincialForm
                formValues={formValues}
                setFormValues={setFormValues}
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