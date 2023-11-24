// components
import SelectField from "../SelectField/SelectField"

import { useDispatch } from "react-redux"
import { evaluacionActions } from "../../../store/evaluacion-slice"
import { useSelector } from "react-redux"
import TextareaInput from "../TextareaInput/TextareaInput"

const Rubrica = ({ rubrica, display, readOnly = false }) => {

    const dispatch = useDispatch()
    const devolucionActual = useSelector(state => state.evaluacion.devoluciones).find(r => r.rubricaId === rubrica._id)
    const evaluacion = useSelector(state => state.evaluacion.criteriosConValores)
    
    const handleChange = (e) => {
        const {name, value} = e.target
        if(value === '') return
        const criterioModificado = rubrica.criterios.find(c => c.nombre === name)
        dispatch(evaluacionActions.actualizarCriterio({rubricaId: rubrica._id, criterioId: criterioModificado._id, valor: value}))

    }

    const onChange = (e) => {
        const {value} = e.target
        dispatch(evaluacionActions.actualizarDevoluciones({rubricaId: rubrica._id, comentario: value}))
    }

    

    return (

        display ? 
        <div className="rubrica">
            <h5 className="rubrica__nombre">{rubrica.nombreRubrica}</h5>
            {rubrica.criterios.map(criterio => {
                const valor = evaluacion.find(e => e.rubricaId === rubrica._id && e.criterioId === criterio._id)
                const errors = valor.error && valor.error !== '' ? true : false
                return (<div key={criterio._id} className="rubrica__input">
                <SelectField
                    label={`${criterio.nombre}: `} 
                    name={criterio.nombre}
                    dataValues={criterio.opciones}
                    value={valor ? valor.opcionSeleccionada : '0'}
                    onChange={handleChange}
                    onBlur={() => {}}
                    errors={{dirty: errors, error: errors, message: valor.error}}
                    required={true}
                    disabled={readOnly}
                />
                </div>)
            })}
            <div className="rubrica__input">
                <TextareaInput disabled={readOnly} label="Devolución: " name={rubrica.nombreRubrica} onChange={onChange} value={devolucionActual.comentario} error={devolucionActual.error}/>

            </div>
            
        </div> 

        : 
        
        null
    )

}

export default Rubrica