// components
import Card from "../components/Card/Card"
import InputField from "../components/InputField/InputField"
import Button from "../components/Button/Button"
// hooks
import { useState } from "react"
import { useFormValidator } from "../hooks/useFormValidator"
import useLogout from "../hooks/useLogout"
import { useNavigate } from "react-router-dom"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import Swal from "sweetalert2"
const CambiarPassword = () => {

    const navigate = useNavigate()
    const axiosPrivate = useAxiosPrivate()
    const logout = useLogout() 

    const [formValues, setFormValues] = useState({
        oldPassword: '',
        password: '',
        confirmPassword: '',
    })

    const [loading, setLoading] = useState(false)

    const { errors, validateForm, onBlurField } = useFormValidator(formValues)
    
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

    const cerrarSesion = async () => {
        await logout()
        navigate('/home')
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
                    text: 'Cambiaste tu contraseña con éxito, por favor, ingresa a CienciaConecta nuevamente.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then(result => {
                    cerrarSesion()
                })
            }
        })
    }

    const restablecerCredenciales = async () => {
        try {
            setLoading(true)
            const body = {
                old_password : formValues.oldPassword,
                new_password : formValues.password
            }
            const res = await axiosPrivate.post('/auth/change-password', JSON.stringify(body),
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
                msg = 'La contraseña actual no es correcta, intente nuevamente.'
            } else if(err.response?.status === 401) {
                msg = 'No estas autorizado para realizar esta operación'
            } else {
                msg = `Falló el intento de cambiar la contraseña. <br> ${err.response.data.message}`
            }
            Swal.fire({
                html: msg,
                title: 'No se pudo cambiar la contraseña',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }

    }

    return (
        <Card title={'Cambiar contraseña'}>
            <div className="cambiar-password">
                <p className="cambiar-password__text">
                    Para cambiar tu contraseña, necesitamos tu contraseña anterior. 
                    Si no la recordás, por favor cerrá sesión y accede a la opción de "Recuperar contraseña".
                </p>
                <p className="cambiar-password__text">
                    Cuando cambies la contraseña se va a cerrar tu sesión, y vas a tener que ingresar nuevamente.
                </p>
            </div>
            <form onSubmit={handleSubmit} className='login-form'>
                <div className='login-form__input '>
                    <InputField
                        label='Contraseña Anterior' 
                        name='oldPassword'
                        placeholder="Contraseña Anterior"
                        type='password'
                        onChange={handleChange}
                        onBlur={onBlurField}
                        value={formValues.oldPassword}
                        errors={errors.oldPassword}
                        required={true}
                    />
                </div>
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
                    <Button text='Cambiar contraseña' activo={true}/>
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

export default CambiarPassword