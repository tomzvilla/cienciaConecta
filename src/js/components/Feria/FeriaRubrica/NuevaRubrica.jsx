// components
import InputField from "../../InputField/InputField"
import ImageButton from "../../ImageButton/ImageButton"

// hooks
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { feriaActions } from "../../../../store/feria-slice"
import Swal from "sweetalert2"

const NuevaRubrica = (props) => {

    const dispatch = useDispatch()
    const listadoRubricas = useSelector(state => state.feria.rubricas)

    const [rubrica, setRubrica] = useState({
        nombreRubrica: '',
        ponderacionRubrica: '',
        criterios: [],
        exposicion: false,
    })

    const [errors, setErrors] = useState({
        nombreRubrica: {
            dirty: false,
            error: false,
            message: '',
        },
        ponderacionRubrica: {
            dirty: false,
            error: false,
            message: '',
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if(rubrica.nombreRubrica === ''){
            setErrors({
                ...errors,
                nombreRubrica: {
                    dirty: true,
                    error: true,
                    message: 'No podés agregar una rúbrica vacía.'
                }
            })
            return
        } else {
            setErrors({
                ...errors,
                nombreRubrica: {
                    dirty: true,
                    error: false,
                    message: ''
                }
                
            })
        }
        if(rubrica.ponderacionRubrica === ''){
            setErrors({
                ...errors,
                ponderacionRubrica: {
                    ...errors.ponderacionRubrica,
                    error: true,
                    message: 'La ponderación debe ser un número entero.'
                }
                
            })
            return
        }
        if(listadoRubricas?.some(r => r.nombreRubrica === rubrica.nombreRubrica)) {
            Swal.fire({
                title: 'No puedes ingresar dos veces la misma rúbrica',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
            return
        }
        console.log(rubrica)
        dispatch(feriaActions.agregarRubrica({
            nombreRubrica: rubrica.nombreRubrica,
            ponderacion: rubrica.ponderacionRubrica,
            criterios: [],
            exposicion: rubrica.exposicion,
        }))
        setErrors({
            nombreRubrica: {
                dirty: false,
                error: false,
                message: '',
            },
            ponderacionRubrica: {
                dirty: false,
                error: false,
                message: '',
            },
        })
        setRubrica({
            nombreRubrica: '',
            ponderacionRubrica: '',
            criterios: [],
            exposicion: false,
        })
    }

    const handleChange = (e) => {
        let {name, value} = e.target
        let error = false
        let message = ''
        let errorNombre = errors.nombreRubrica.error
        let messageNombre = errors.nombreRubrica.message
        if(name === 'ponderacionRubrica') {
            if(value < 0 || value > 100) {
                error = true
                message = 'La ponderación debe estar comprendida entre 0 y 100.'
            } else if (!/^-?\d*$/.test(value)) {
                return
            }
            else {
                error = false
                message = ''
            }
        } 
        if(name === 'nombreRubrica') {
           errorNombre = false
           messageNombre = ''
        }
        if(name === 'exposicion') {
            value = e.target.checked
        }
        setRubrica({
            ...rubrica,
            [name]: value,
        })
        setErrors({
            nombreRubrica: {
                error: errorNombre,
                message: messageNombre,
                dirty: true
            },
            ponderacionRubrica: {
                error,
                message,
                dirty: true
            }
        })
    }

    return (
        <div className="nueva-rubrica">
            <h5 className="nueva-rubrica__title">Nueva Rúbrica</h5>
            <div className="nueva-rubrica__input" >
                <InputField
                    label='Nombre: ' 
                    name={`nombreRubrica`}
                    onChange={handleChange}
                    onBlur={() => {}}
                    value={rubrica.nombreRubrica}
                    errors={errors.nombreRubrica}
                    onFocusOut
                    required={true}
                />
            </div>
            <div className="nueva-rubrica__input" >
                <InputField
                    label='Ponderación: ' 
                    type={'number'}
                    name={`ponderacionRubrica`}
                    onChange={handleChange}
                    onBlur={() => {}}
                    value={rubrica.ponderacionRubrica}
                    errors={errors.ponderacionRubrica}
                    onFocusOut
                    required={true}
                />
            </div>
            <div className="nueva-rubrica__input" >
                <InputField
                    label='Exposición: ' 
                    type={'checkbox'}
                    name={`exposicion`}
                    onChange={handleChange}
                    onBlur={() => {}}
                    
                    errors={errors.exposicion}
                    onFocusOut
                    required={true}
                />
            </div>

            <div className="nueva-rubrica__image-container">
                <ImageButton
                    alt="Agregar Rubrica"
                    callback={handleSubmit} 
                    src={require("../../../../assets/add.png")}
                    small={true}
                />
            </div>
        </div>

    )
}

export default NuevaRubrica