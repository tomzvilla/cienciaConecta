// components
import InputField from "../../InputField/InputField";
import ImageButton from "../../ImageButton/ImageButton";

// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feriaActions } from "../../../../store/feria-slice";
import Swal from "sweetalert2";

const NuevoCriterio = (props) => {

    const listadoCriterios = useSelector(state => state.feria.rubricas)?.find(r => r.nombreRubrica === props.rubrica.nombreRubrica)?.criterios
    const dispatch = useDispatch()

    const [criterio, setCriterio] = useState({
        nombre: '',
        ponderacion: '',
        opciones: [],
    })

    const [errors, setErrors] = useState({
        nombre: {
            dirty: false,
            error: false,
            message: '',
        },
        ponderacion: {
            dirty: false,
            error: false,
            message: '',
        },
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if(criterio.nombre === ''){
            setErrors({
                ...errors,
                nombre: {
                    dirty: true,
                    error: true,
                    message: 'No podés agregar un criterio vacío.'
                }
            })
            return
        } else {
            setErrors({
                ...errors,
                nombre: {
                    dirty: true,
                    error: false,
                    message: ''
                }
                
            })
        }
        if(criterio.ponderacion === ''){
            setErrors({
                ...errors,
                ponderacion: {
                    ...errors.ponderacion,
                    error: true,
                    message: 'La ponderación debe ser un número entero.'
                }
                
            })
            return
        }
        if(listadoCriterios?.some(c => c.nombre === criterio.nombre)) {
            Swal.fire({
                title: 'No puedes ingresar dos veces el mismo criterio',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
            return
        }
        dispatch(feriaActions.agregarCriterio({rubrica: props.rubrica, criterio}))
        setErrors({
            nombre: {
                dirty: false,
                error: false,
                message: '',
            },
            ponderacion: {
                dirty: false,
                error: false,
                message: '',
            },
        })
        setCriterio({
            nombre: '',
            ponderacion: '',
            opciones: [],
        })
    }

    const handleChange = (e) => {
        let {name, value} = e.target
        let error = false
        let message = ''
        let errorNombre = errors.nombre.error
        let messageNombre = errors.nombre.message
        if(name === 'ponderacion') {
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
        if(name === 'nombre') {
           errorNombre = false
           messageNombre = ''
        }
        setCriterio({
            ...criterio,
            [name]: value,
        })
        setErrors({
            nombre: {
                error: errorNombre,
                message: messageNombre,
                dirty: true
            },
            ponderacion: {
                error,
                message,
                dirty: true
            }
        })
    }

    return (
        <div className="nuevo-criterio">
            <h5 className="nuevo-criterio__title">Nuevo Criterio</h5>

            <div className="nuevo-criterio__input nuevo-criterio__input--criterio" >
                <InputField
                    label='Criterio: ' 
                    name='nombre'
                    type={'text'}
                    onChange={handleChange}
                    onBlur={() => {}}
                    value={criterio.nombre}
                    errors={errors.nombre}
                />
            </div>

            <div className="nuevo-criterio__input nuevo-criterio__input--ponderacion" >
                <InputField
                    label='Ponderacion: ' 
                    name='ponderacion'
                    type={'number'}
                    onChange={handleChange}
                    onBlur={() => {}}
                    value={criterio.ponderacion}
                    errors={errors.ponderacion}
                />
            </div>

            <div className="nuevo-criterio__image-container">
                <ImageButton
                    alt="Agregar Criterio"
                    callback={handleSubmit} 
                    src={require("../../../../assets/add.png")}
                    small={true}
                />
            </div>
        </div>

    )
}

export default NuevoCriterio;