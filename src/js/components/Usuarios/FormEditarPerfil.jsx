// components
import InputField from "../InputField/InputField"
import Button from "../Button/Button"

// hooks
import { useState } from "react"
import { useFormValidator } from "../../hooks/useFormValidator"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useDispatch } from "react-redux"
import { perfilActions } from "../../../store/perfil-slice"

import Swal from "sweetalert2"

const FormEditarPerfil = (props) => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()

    const [formValues, setFormValues] = useState({
        name: props.usuario.nombre,
        lastname: props.usuario.apellido,
        email: props.usuario.usuario.email,
        phoneNumber: props.usuario.telefono,
        position: props.usuario.cargo,
    })

    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

    const handleChange = (e) => {
        let {name, value} = e.target
        const nextFormValueState = {
          ...formValues,
          [name]: value
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty){
          validateForm({form: nextFormValueState, errors, name})
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Swal.fire({
            title: '¿Deseas actualizar tus datos?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Actualizar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await actualizarUsuario()
                if(success) Swal.fire({
                    title: '¡Datos actualizados!',
                    text: 'Actualizaste tus datos con éxito',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                })
                dispatch(perfilActions.updateUsuario(formValues))
                props.setEditando(false)
            }
        })
    }

    const actualizarUsuario = async () => {
        try {
            const body = {
                nombre: formValues.name,
                apellido: formValues.lastname,
                telefono: formValues.phoneNumber,
                cargo: formValues.position,
                email: formValues.email
            }
            const res = await axiosPrivate.patch(`/usuario/${props.usuario.usuario._id}`, JSON.stringify(body))
            return res.status === 200

        } catch(err) {
            let msg = ''
            console.log(JSON.stringify(err.response.data))
            if(!err?.response){
                msg = 'El servidor no respondió'
            } else if(err.response?.status === 404) {
                msg = 'Hubo un error al validar los datos ingresados, intente nuevamente.'
            } else if(err.response?.status === 401) {
                msg = 'No estas autorizado para realizar esta operación'
            } else {
            msg = `Falló la actualización de tus datos. <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la actualización de tus datos',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })

        }
    }

    return (
        <form className="datos-feria-form">
            <div className='datos-feria-form__input'>
                <InputField
                    label='Nombre: ' 
                    name='name'
                    type='text'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.name}
                    errors={errors.name}
                    required={true}
                />
            </div>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Apellido: ' 
                    name='lastname'
                    type='text'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.lastname}
                    errors={errors.lastname}
                    required={true}
                />
            </div>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Email' 
                    name='email'
                    type='email'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.email}
                    errors={errors.email}
                    required={true}
                />
            </div>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Teléfono' 
                    name='phoneNumber'
                    type='number'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.phoneNumber}
                    errors={errors.phoneNumber}
                    required={true}
                />
            </div>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Cargo' 
                    name='position'
                    type='text'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.position}
                    errors={errors.position}
                    required={true}
                />
            </div>
            <div className='crear-feria-form__button'>
                <Button text='Actualizar' onClickHandler={handleSubmit} activo={true}/>
            </div>
        </form>
    )
}

export default FormEditarPerfil