// components
import InputField from "../../InputField/InputField";
import ImageButton from "../../ImageButton/ImageButton";

// hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { feriaActions } from "../../../../store/feria-slice";
import Swal from "sweetalert2";

const AddOpcion = (props) => {

    const listadoOpciones = useSelector(state => state.feria.rubricas).find(r => r.nombreRubrica === props.rubrica.nombreRubrica)?.criterios?.find(c => c.nombre === props.criterio.nombre).opciones
    const dispatch = useDispatch()


    const [opcion, setOpcion] = useState({
        nombreOpcion: '',
        puntaje: '',
    })

    const [errors, setErrors] = useState({
        nombreOpcion: {
            dirty: false,
            error: false,
            message: '',
        },
        puntaje: {
            dirty: false,
            error: false,
            message: '',
        },
    })

    const handleAdd = (e) => {
        e.preventDefault()
        if(opcion.nombreOpcion === ''){
            setErrors({
                ...errors,
                nombreOpcion: {
                    dirty: true,
                    error: true,
                    message: 'No podés agregar una opción vacía.'
                }
            })
            return
        } else {
            setErrors({
                ...errors,
                nombreOpcion: {
                    dirty: true,
                    error: false,
                    message: ''
                }
                
            })
        }
        if(opcion.puntaje === ''){
            setErrors({
                ...errors,
                puntaje: {
                    ...errors.puntaje,
                    error: true,
                    message: 'El puntaje debe ser un número entero.'
                }
                
            })
            return
        }
        if(listadoOpciones?.some(o => o.nombre === opcion.nombreOpcion)) {
            Swal.fire({
                title: 'No puedes ingresar dos veces la misma opción',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
            return
        }
        dispatch(feriaActions.agregarOpcion({
            rubrica: props.rubrica, 
            criterio: props.criterio, 
            opcion: {
                nombre: opcion.nombreOpcion,
                puntaje: opcion.puntaje
            }}))
        setErrors({
            nombreOpcion: {
                dirty: false,
                error: false,
                message: '',
            },
            puntaje: {
                dirty: false,
                error: false,
                message: '',
            },
        })
        setOpcion({
            nombreOpcion: '',
            puntaje: '',
        })
    }

    const handleChange = (e) => {
        let {name, value} = e.target
        let error = false
        let message = ''
        let errorNombre = errors.nombreOpcion.error
        let messageNombre = errors.nombreOpcion.message
        if(name === 'puntaje') {
            if(value < 0 || value > 100) {
                error = true
                message = 'El puntaje debe estar comprendido entre 0 y 100.'
            } else if (!/^-?\d*$/.test(value)) {
                return
            }
            else {
                error = false
                message = ''
            }
        } 
        if(name === 'nombreOpcion') {
           errorNombre = false
           messageNombre = ''
        }
        setOpcion({
            ...opcion,
            [name]: value,
        })
        setErrors({
            nombreOpcion: {
                error: errorNombre,
                message: messageNombre,
                dirty: true
            },
            puntaje: {
                error,
                message,
                dirty: true
            }
        })
    }

    return (
        <div className="add-opcion">
            <div className="add-opcion__opcion">
                <InputField
                    label='Nombre: ' 
                    name='nombreOpcion'
                    type='text'
                    onChange={handleChange}
                    onBlur={() => {}}
                    value={opcion.nombreOpcion}
                    errors={errors.nombreOpcion}
                />
            </div>
            <div className="add-opcion__opcion">
                <InputField
                    label='Puntaje: ' 
                    name='puntaje'
                    type={'number'}
                    onChange={handleChange}
                    onBlur={() => {}}
                    value={opcion.puntaje}
                    errors={errors.puntaje}
                />
            </div>
            <div className="add-opcion__opcion">
                <ImageButton small={true} src={require("../../../../assets/add.png")} callback={handleAdd} text="Añadir"/>
            </div>
        </div>
    );
}

export default AddOpcion;