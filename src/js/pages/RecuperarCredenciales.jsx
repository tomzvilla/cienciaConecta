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
            const numericCuil = formValues.cuil.replace(/\D/g, '');
            const res = await axiosPrivate.post('/auth/recuperar-contrasena', JSON.stringify(
                {
                    cuil: numericCuil
                }))
        
            if(res?.status === 200) {
                Swal.fire({
                    title: 'Enviamos un correo a tu casilla de correo electrónico',
                    text: 'Por favor, accede a tu casilla de correo electrónico y sigue las instrucciones del correo que te enviamos.',
                    icon: 'info',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                })
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <Card title="Recuperar Credenciales">
            <form onSubmit={handleSubmit} className='recover-form'>
                <p className='recover-form__text'>
                    Ingresá tu CUIL y te vamos a enviar un correo a la casilla de e-mail con la que te registraste. <br/>
                    Por favor, revisá tu correo y seguí las instrucciones.
                </p>
                <div className='recover-form__input'>
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
                <div className='recover-form__button'>
                    <Button text='Aceptar' activo={true}/>
                </div>
            </form>
        </Card>
    )
}

export default RecuperarCredenciales