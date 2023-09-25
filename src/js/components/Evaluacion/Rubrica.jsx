// components
import SelectField from "../SelectField/SelectField"

import { useDispatch } from "react-redux"
import { evaluacionActions } from "../../../store/evaluacion-slice"
import { useSelector } from "react-redux"

const Rubrica = ({ rubrica, display }) => {

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
        <div>
            <h2>{rubrica.nombreRubrica}</h2>
            {rubrica.criterios.map(criterio => {
                const valor = evaluacion.find(e => e.rubricaId === rubrica._id && e.criterioId === criterio._id)
                const errors = valor.error && valor.error !== '' ? true : false
                return (<div key={criterio._id} className="postulacion-form__input">
                <SelectField
                    label={`${criterio.nombre}: `} 
                    name={criterio.nombre}
                    dataValues={criterio.opciones}
                    value={valor ? valor.opcionSeleccionada : '0'}
                    onChange={handleChange}
                    onBlur={() => {}}
                    errors={{dirty: errors, error: errors, message: valor.error}}
                    required={true}
                />
                </div>)
            })}
            <div className={`input-field`}>
            {}
            <label className={`input-field__label input-field__label${devolucionActual.error ? '--error' : ''}`}>Devolucion de Rúbrica: </label>
                <textarea
                className={`input-field__input`}
                name={rubrica.nombreRubrica}
                onChange={onChange}
                value={devolucionActual.comentario}
                />
                {devolucionActual.error && <small className='select-field__error'>{devolucionActual.error}</small>}
            </div>
        </div> 

        : 
        
        null
    )

}

export default Rubrica