// components
import Rubrica from "./Rubrica"
import Button from "../Button/Button"
import Card from "../Card/Card"
import Spinner from "../Spinner/Spinner"
// hooks
import { useState, useEffect } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useNavigate, useLocation, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { evaluacionActions } from "../../../store/evaluacion-slice"
import { ESTADOS } from "../../../App"

const EvaluacionFormConsulta = (props) => {
    
    const { id } = useParams()
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state?.from || 'dashboard'

    // TODO iniciar evaluacion
    const rubricas = useSelector(state => state.evaluacion.rubricas)
    const rubricaActual = useSelector(state => state.evaluacion.rubricaActual)
    const feria = useSelector(state => state.instancias.feria)

    // definicion dinamica del endpoint
    const endpoint = feria?.estado === ESTADOS.instanciaRegional_ExposicionFinalizada ? 'exposicion' : 'exposicion-provincial'
    const {data: evaluacionStructure, isLoading} = useAxiosFetch(`/${endpoint}/consultar/${id}`, axiosPrivate)
    let evaluacion = isLoading ? {} : evaluacionStructure
    

    const [emptyValueAdded, setEmptyValueAdded] = useState(false)

    const cargarRubricas = () => {
        const vacio = {_id: 0, nombre: ''}
        const nombreCriterios = []
        const devoluciones = []
        const rubricas = []
        if(!isLoading) {
            evaluacion?.forEach((rubrica) => {
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
        }
    }

    useEffect(()=> {
        if(!isLoading) cargarRubricas()
    }, [isLoading])

    const handleContinuar = () => {
        dispatch(evaluacionActions.siguienteRubrica(rubricaActual))
        
    }

    const handleVolver = () => {
        if(rubricaActual === rubricas[0]){
            navigate(from, {replace: true, state: {from:`${location.pathname}`}})
        }
        else {
            dispatch(evaluacionActions.anteriorRubrica(rubricaActual))
        }
    }

    const handleRegresar = () => {
        navigate('/promoverProyectos', {replace: true, state: {from:`${location.pathname}`}})
    }

    return(
        <Card title={'Evaluación del proyecto'}>
            {isLoading ?
            <Spinner />
            :
            <>
                {emptyValueAdded && evaluacion?.map(rubrica => (
                <Rubrica key={rubrica._id} display={rubrica._id === rubricaActual} rubrica={rubrica} readOnly={true}/>))}
                <div className="button-container">
                    <Button 
                        text='Volver' 
                        onClickHandler={handleVolver}
                    />
                    {rubricaActual === rubricas[rubricas.length - 1] ? 
                        <Button 
                            text='Regresar'
                            activo={true} 
                            onClickHandler={handleRegresar}
                        />
                        :
                        <Button 
                            text='Continuar'
                            activo={true} 
                            onClickHandler={handleContinuar}
                        />
                    }
                </div>
            </>
        }
        </Card>
    )

}

export default EvaluacionFormConsulta