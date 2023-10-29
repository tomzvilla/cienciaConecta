// components
import Rubrica from "./Rubrica"
import Button from "../Button/Button"
import Card from "../Card/Card"
// hooks
import { useState, useEffect } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useNavigate, useLocation } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useDispatch, useSelector } from "react-redux"
import { evaluacionActions } from "../../../store/evaluacion-slice"
import Swal from "sweetalert2"
import { ESTADOS } from "../../../App"

const EvaluacionForm = (props) => {
    
    const {evaluacion, projectId} = props
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()
    const { auth } = useAuth()
    const from = location?.state?.from || 'dashboard'

    // TODO iniciar evaluacion
    const evaluaciones = useSelector(state => state.evaluacion.criteriosConValores)
    const devoluciones = useSelector(state => state.evaluacion.devoluciones)
    const rubricas = useSelector(state => state.evaluacion.rubricas)
    const rubricaActual = useSelector(state => state.evaluacion.rubricaActual)
    const feria = useSelector(state => state.instancias.feria)

    // definicion dinamica del endpoint
    const endpoint = feria?.estado === ESTADOS.instanciaRegional_EnEvaluacion ? 'evaluacion' : feria?.estado === ESTADOS.instanciaRegional_EnExposicion ? 'exposicion' : 'exposicion-provincial'
    

    const [emptyValueAdded, setEmptyValueAdded] = useState(false)

    useEffect(()=> {
        const vacio = {_id: 0, nombre: ''}
        const nombreCriterios = []
        const devoluciones = []
        const rubricas = []
        evaluacion !== null && evaluacion.forEach((rubrica) => {
            const rubricaId = rubrica._id
            rubricas.push(rubricaId)
            devoluciones.push({rubricaId, comentario: rubrica?.comentario ?? ''})
            rubrica.criterios.forEach(criterio => {
                if(!criterio.opciones.find(op => op._id === vacio._id))
                    criterio.opciones.unshift(vacio)
                const criterioId = criterio._id
                nombreCriterios.push({rubricaId, criterioId, opcionSeleccionada: criterio?.seleccionada ?? ''})
            })
        })
        setEmptyValueAdded(true)
        dispatch(evaluacionActions.cargarCriteriosVacios(nombreCriterios))
        dispatch(evaluacionActions.cargarDevoluciones(devoluciones))
        dispatch(evaluacionActions.cargarRubricas(rubricas))

        return async () => {
            try {
                await axiosPrivate.delete(`/${endpoint}/${projectId}`, 
                { 
                    headers: { 
                        withCredentials: true,
                        Authorization: `Bearer ${auth?.accessToken}`
                    }
                })
            } catch (err) {
                console.log(err)
            }
        }

    }, [evaluacion, dispatch, axiosPrivate, projectId, auth.accessToken])

    const validarRubrica = (idRubricaActual) => {
        let isValid = true
        evaluaciones.forEach(evl => {
            let errorMsg = ''
            if(evl.rubricaId === idRubricaActual) {
                if(evl.opcionSeleccionada === '0' || evl.opcionSeleccionada === '') {
                    errorMsg = 'Debe ingresar una opción para este criterio'
                    isValid = false
                }
                dispatch(evaluacionActions.cargarError({rubricaId: evl.rubricaId, criterioId: evl.criterioId, error: errorMsg}))
            }
        })
        const devolucion = devoluciones.find(d => d.rubricaId === idRubricaActual)

        // validacion de devoluciones
        let errorMsg = ''

        if(!devolucion || devolucion.comentario === '') {
            errorMsg = 'Debe ingresar una devolución para la rubrica actual'
            isValid = false
            dispatch(evaluacionActions.cargarErrorDevolucion({rubricaId: idRubricaActual, error: errorMsg}))
        } else if(devolucion?.error !== ''){
            dispatch(evaluacionActions.cargarErrorDevolucion({rubricaId: idRubricaActual, error: ''}))
        }
        return isValid

    }

    const handleContinuar = () => {
        const isValid = validarRubrica(rubricaActual)
        if(isValid) dispatch(evaluacionActions.siguienteRubrica(rubricaActual))
        
    }

    const handleVolver = () => {
        if(rubricaActual === rubricas[0]){
            navigate(from, {replace: true, state: {from:`${location.pathname}`}})
        }
        else {
            dispatch(evaluacionActions.anteriorRubrica(rubricaActual))
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const firstTitle = feria?.estado === ESTADOS.instanciaRegional_EnEvaluacion ? '¿Deseas evaluar este proyecto en la instancia regional?' : feria?.estado === ESTADOS.instanciaRegional_EnExposicion ? '¿Deseas evaluar la exposición de este proyecto en la instancia regional?' : '¿Deseas evaluar la exposición de este proyecto en la instancia provincial?'
        const secondText = feria?.estado === ESTADOS.instanciaRegional_EnEvaluacion ? 'Evaluaste el proyecto con éxito' : feria?.estado === ESTADOS.instanciaRegional_EnExposicion ? 'Evaluaste la exposición regional del proyecto con éxito' : 'Evaluaste la exposición provincial del proyecto con éxito'
        Swal.fire({
            title: firstTitle,
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Evaluar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await evaluarProyecto()
                if(success) Swal.fire({
                    title: '¡Proyecto Evaluado!',
                    text: secondText,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) { 
                        navigate(from, {replace: true, state: { from:`${location.pathname}`}})
                        
                    }
                })
            }
        })
       
    }

    const evaluarProyecto = async () => {

        const body = {
            evaluacion: evaluaciones,
            comentarios: devoluciones
        }
        try {
            const response = await axiosPrivate.post(`/${endpoint}/${projectId}`, body, 
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            })
            if(response.status === 200) return true
        } catch (err) {
            let msg = ''
            if(!err?.response){
                msg = 'El servidor no respondió'
            } else if(err.response?.status === 403) {
                msg = 'Datos incorrectos intente nuevamente'
            } else if(err.response?.status === 401) {
                msg = 'No estas autorizado para realizar esta operación'
            } else {
                msg = `Falló la evaluación del proyecto <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la evaluación',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }
    }


    return(
        <Card title={'Evaluar el Proyecto'}>
            {emptyValueAdded && evaluacion.map(rubrica => (
                <Rubrica key={rubrica._id} display={rubrica._id === rubricaActual} rubrica={rubrica}/>
            ))}
            <div className="button-container">
                <Button 
                    text='Volver' 
                    onClickHandler={handleVolver}
                />
                {rubricaActual === rubricas[rubricas.length - 1] ? 
                    <Button 
                        text='Evaluar'
                        activo={true} 
                        onClickHandler={handleSubmit}
                    />
                    :
                    <Button 
                        text='Continuar'
                        activo={true} 
                        onClickHandler={handleContinuar}
                    />
                }
            </div>
        </Card>
        

    )

}

export default EvaluacionForm