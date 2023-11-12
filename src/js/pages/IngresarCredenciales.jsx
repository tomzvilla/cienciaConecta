// components
import InputField from "../components/InputField/InputField"
import Button from "../components/Button/Button"
import Card from "../components/Card/Card"

// hooks
import { useState } from "react"
import { useParams, useNavigate } from "react-router"
import { useFormValidator } from "../hooks/useFormValidator"
import axios from "../../api/axios"

import Swal from "sweetalert2"

const IngresarCredenciales = () => {

    const { token } = useParams()
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        password: '',
        confirmPassword: '',
    })

    const [loading, setLoading] = useState(false)


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

        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})

        if(!isValid) return

        Swal.fire({
            title: '¿Deseas cambiar tu contraseña?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Cambiar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await restablecerCredenciales()
                if(success) Swal.fire({
                    title: '¡Contraseña modificada!',
                    text: 'Recuperaste tu contraseña con éxito, por favor, ingresa a CienciaConecta nuevamente.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then(result => {
                    navigate('/home')
                })
            }
        })
    }

    const restablecerCredenciales = async () => {
        try {
            setLoading(true)
            const body = {
                token: token,
                nuevaContrasena: formValues.password
            }
            const res = await axios.post('/auth/reset-password', JSON.stringify(body),
            {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            setLoading(false)
            return res.status === 200
        } catch (err) {
            let msg = ''
            setLoading(false)
            if(!err?.response){
                msg = 'El servidor no respondió'
            } else if(err.response?.status === 400) {
                msg = 'El período de confirmación del cambio de contraseña expiró o el token no es válido. Por favor, intente nuevamente.'
            } else if(err.response?.status === 401) {
                msg = 'No estas autorizado para realizar esta operación'
            } else {
                msg = `Falló el intento de recuperar la contraseña. <br> ${err.response.data.message}`
            }
            Swal.fire({
                html: msg,
                title: 'No se pudo recuperar la contraseña',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }

    }

    return (
        <Card title={'Reestablecer contraseña'}>
            <form onSubmit={handleSubmit} className='login-form'>
                <div className='login-form__input '>
                    <InputField
                        label='Nueva contraseña' 
                        name='password'
                        placeholder="Nueva contraseña"
                        type='password'
                        onChange={handleChange}
                        onBlur={onBlurField}
                        value={formValues.password}
                        errors={errors.password}
                        required={true}
                    />
                </div>
                <div className='login-form__input'>
                    <InputField 
                        label='Repita su nueva contraseña: '
                        name='confirmPassword'
                        type='password'
                        onChange={handleChange}
                        onBlur={onBlurField}
                        value={formValues.confirmPassword}
                        errors={errors.confirmPassword}
                        required={true}
                    />
                </div>

                {!loading ? 
                <div className='login-form__button'>
                    <Button text='Reestablecer contraseña' activo={true}/>
                </div>
                :
                <div className='login-form__button'>
                    <Button text='Cargando...' activo={true} disabled={true}/>
                </div>
                }
            </form>
        </Card>
    )

}

export default IngresarCredenciales