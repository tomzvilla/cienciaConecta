// components
import Button from "../components/Button/Button"
import InputField from "../components/InputField/InputField"
import Card from "../components/Card/Card"

// hooks
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import { useState } from "react"
import useUtils from '../hooks/useUtils'
import { useFormValidator } from "../hooks/useFormValidator"

import Swal from "sweetalert2"

const RecuperarCredenciales = () => {
    
    const axiosPrivate = useAxiosPrivate()
    const { formatCuil } = useUtils()
    const [formValues, setFormValues] = useState({
        cuil: ''
    })
    const { validateForm, errors, onBlurField } = useFormValidator(formValues)

    const handleChange = (e) => {
        let {name, value} = e.target
        value = formatCuil(value)
        
        const nextFormValueState = {
          ...formValues,
          [name]: value
        }
        
        setFormValues(nextFormValueState)
        if (errors[name].dirty){
          validateForm({form: nextFormValueState, errors, name})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!formValues.cuil) return

        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})

        if(!isValid) return

        await recuperarPassword()

        
    }

    const recuperarPassword = async () => {
        try {
            const res = await axiosPrivate.post('/auth/recuperar-contrasena', JSON.stringify(
                {
                    cuil: formValues.cuil
                }))
        
            if(res?.status === 200) {
                Swal.fire({
                    title: 'Enviamos un correo a tu casilla de correo electrónico',
                    text: 'Por favor, accede a tu casilla de correo electrónico y sigue las instrucciones del correo que te enviamos.',
                    icon: 'info',
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                })
            }

        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Card>
            <form onSubmit={handleSubmit} className='login-form'>
                <div>
                    <p>
                        Ingrese su CUIL, si existe un usuario registrado con ese CUIL se le enviará un correo al mail 
                        ingresado durante el registro. Por favor, ingresá a dicho mail y seguí las instrucciones indicadas.
                    </p>
                </div>
                <div className='login-form__input'>
                    <InputField 
                        label='CUIL: '
                        name='cuil'
                        type='cuil'
                        onChange={handleChange}
                        onBlur={onBlurField}
                        value={formValues.cuil}
                        errors={errors.cuil}
                        required={true}
                    />
                </div>
                <div className='login-form__button'>
                    <Button text='Recuperar credenciales' activo={true}/>
                </div>
            </form>
        </Card>
    )
}

export default RecuperarCredenciales