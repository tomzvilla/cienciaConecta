// components
import DatosFeriaForm from "./DatosFeriaForm"
import InstanciasFeriaForm from "./InstanciasFeriaForm";
import SedesFeriaForm from "./SedesFeriaForm";
import Button from "../Button/Button";
import SedeProvincialForm from "./SedeProvincialForm";
import RubricasFeriaForm from "./RubricasFeriaForm";
import Card from "../Card/Card";
// hooks
import {useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormValidator } from "../../hooks/useFormValidator";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useSelector } from "react-redux";

import Swal from 'sweetalert2'

export const ETAPAS = {
    Datos: '1',
    Instancias: '2',
    SedesRegionales: '3',
    SedeProvincial: '4',
    Criterios: '5',
  };

const ActualizarFeriaForm = (props) => {
    const { formData, sedes } = props
    const criteriosEvaluacion = useSelector(state => state.feria.rubricas)
    const axiosPrivate = useAxiosPrivate()

    const [formValues, setFormValues] = useState({
        nombreFeria: formData.nombre,
        descripcionFeria: formData.descripcion,
        fechaInicioFeria: formData.fechaInicioFeria,
        fechaFinFeria: formData.fechaFinFeria,
        fechaInicioInstanciaEscolar: formData.instancias.instanciaEscolar.fechaInicioInstancia,
        fechaFinInstanciaEscolar: formData.instancias.instanciaEscolar.fechaFinInstancia,
        fechaInicioEvaluacionRegional: formData.instancias.instanciaRegional.fechaInicioEvaluacionTeorica,
        fechaFinEvaluacionRegional: formData.instancias.instanciaRegional.fechaFinEvaluacionTeorica,
        fechaInicioExposicionRegional: formData.instancias.instanciaRegional.fechaInicioEvaluacionPresencial,
        fechaFinExposicionRegional: formData.instancias.instanciaRegional.fechaFinEvaluacionPresencial,
        fechaInicioEvaluacionProvincial: formData.instancias.instanciaProvincial.fechaInicioEvaluacionPresencial,
        fechaFinEvaluacionProvincial: formData.instancias.instanciaProvincial.fechaFinEvaluacionPresencial,
        fechaInicioPostulacionEvaluadores: formData.fechaInicioPostulacionEvaluadores,
        fechaFinPostulacionEvaluadores: formData.fechaFinPostulacionEvaluadores,
        fechaInicioAsignacionProyectos: formData.fechaInicioAsignacionProyectos,
        fechaFinAsignacionProyectos: formData.fechaFinAsignacionProyectos,
        fechaPromocionInstanciaRegional: formData.instancias.instanciaRegional.fechaPromocionAProvincial,
        fechaPromocionInstanciaProvincial: formData.instancias.instanciaProvincial.fechaPromocionANacional,
        departamento: '',
        localidad: '',
        establecimientos: [...sedes],
        cupos: [...formData.instancias.instanciaRegional.cupos],
        cuposProvincial: [...formData.instancias.instanciaProvincial.cupos],
        errorSumaPonderacion: false,
        errorRubrica:  false,
    })

    const [etapaActual, setEtapaActual] = useState(ETAPAS.Datos)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/dashboard'
     
    const {errors, validateForm, onBlurField} = useFormValidator(formValues)
    const [disabled, setDisabled] = useState({})
    const [fieldsToDisable, setFieldsToDisable] = useState([])

    const verificarFechas = () => {
        let fields = []
        const fechaActual = new Date()
        const prevDisabled = { ...disabled }
        for(const propiedad in formValues){
            if (propiedad.includes("fecha")) {
                if(fechaActual > new Date(formValues[propiedad])) {
                    fields.push(propiedad)
                    prevDisabled[propiedad] = true
                }
            }
        }
        setDisabled(prevDisabled)
        setFieldsToDisable(fields)
    }

    useEffect(() => {
        verificarFechas()
    },[])

    const cambiarVista = (e) => {
        e.preventDefault()

        let fieldsToExclude = [...fieldsToDisable]

        if(etapaActual === ETAPAS.Datos) {
            fieldsToExclude = fieldsToExclude.concat(['fechaInicioInstanciaEscolar', 'fechaFinInstanciaEscolar','fechaInicioEvaluacionRegional', 'fechaFinEvaluacionRegional', 'fechaInicioExposicionRegional', 'fechaFinExposicionRegional', 
            'fechaInicioEvaluacionProvincial',  'fechaFinEvaluacionProvincial', 'fechaInicioPostulacionEvaluadores', 'fechaFinPostulacionEvaluadores', 'fechaInicioAsignacionProyectos','fechaFinAsignacionProyectos', 'fechaPromocionInstanciaRegional', 'fechaPromocionInstanciaProvincial', 'cupos', 'criteriosEvaluacion', 'nombreRubrica'
            ])
        }
        if(etapaActual === ETAPAS.Instancias) fieldsToExclude = fieldsToExclude.concat(['cupos', 'criteriosEvaluacion', 'nombreRubrica'])
        if(etapaActual === ETAPAS.SedesRegionales) fieldsToExclude = fieldsToExclude.concat(['criteriosEvaluacion', 'nombreRubrica'])
        if(etapaActual === ETAPAS.SedeProvincial) fieldsToExclude = fieldsToExclude.concat(['criteriosEvaluacion', 'nombreRubrica'])
        if(etapaActual === ETAPAS.Criterios) fieldsToExclude = fieldsToExclude.concat([])
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
        try {
            let nuevaFecha = date?.toISOString().slice(0,22)
            let zonaHoraria = "-03:00"
            return nuevaFecha + zonaHoraria
        } catch (err) {
            console.log(err)
        }

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

    const validarCriteriosEvaluacion = () => {
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
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true, fieldsToExclude: fieldsToDisable})
        if(!isValid) return
        if(formValues.errorSumaPonderacion) return
        const messageError = validarCriteriosEvaluacion(formValues.criteriosEvaluacion)
        if(messageError !== '') {
            Swal.fire({
                text: messageError,
                title: 'Falló la actualización de la feria',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
            return
        }
        Swal.fire({
            title: '¿Deseas actualizar la Feria?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Actualizar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await actualizarFeria()
                if(success) Swal.fire({
                    title: '¡Feria Actualizada!',
                    text: 'Actualizaste la Feria con éxito',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) { 
                        navigate(from, {replace: true, state: {newRol:'2', from:'/feria'}})
                        
                    }
                })
            }
        })
        const actualizarFeria = async () => {
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
                const sedesRegional = new Set(establecimientos.map(e => { return e._id }))
                const response = await axiosPrivate.patch(`/feria/${formData._id}`, 
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
                            cupos,
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
                    criteriosEvaluacion,
                }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
                )
                if(response.status === 200) return true
                
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
                    msg = `Falló la actualización de la feria <br> ${err.response.data.msg}`
                }
                Swal.fire({
                    html: msg,
                    title: 'Falló la actualización de la Feria',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                })
            } 
        }

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

    return (
        <Card title="Actualizar Feria de Ciencias y Tecnología">
            <form className='crear-feria-form'>
                {etapaActual === ETAPAS.Datos && <DatosFeriaForm
                    handleChange={handleChange}
                    handleDateChange={handleDateChange}
                    onBlurField={onBlurField}
                    formValues={formValues}
                    errors={errors}
                    disabled={disabled}
                />}
                {etapaActual === ETAPAS.Instancias && <InstanciasFeriaForm
                    handleDateChange={handleDateChange}
                    onBlurField={onBlurField}
                    formValues={formValues}
                    errors={errors}
                    disabled={disabled}
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
                    formValues={formValues}
                    setFormValues={setFormValues}
                />}
                {etapaActual === ETAPAS.Criterios && <RubricasFeriaForm  />}
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
                        text={'Actualizar'} 
                        onClickHandler={handleSubmit} activo={true}
                    />}
                </div>
            </form>
        </Card>
    )
}

export default ActualizarFeriaForm