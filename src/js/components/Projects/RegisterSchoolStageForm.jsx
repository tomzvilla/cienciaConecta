// Import Components

import InputField from "../../components/InputField/InputField"
import SelectField from "../../components/SelectField/SelectField"
import Button from "../../components/Button/Button"

// Import hooks
import { useState } from "react"
import { useFormValidator } from "../../hooks/useFormValidator"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

const RegisterSchoolStageForm = () => {
    
const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    level: '',
    category: '',
    schoolName: '',
    schoolCue: '',
    privateSchool: '',
    schoolEmail: ''
})

const axiosPrivate = useAxiosPrivate()

const {errors, validateForm, onBlurField} = useFormValidator(formValues)

const { data: categories, loading:categoriesLoading, error: categoriesError } = useAxiosFetch('/categoria', axiosPrivate)
const { data: levels, loading:levelsLoading, error: levelsError } = useAxiosFetch('/nivel', axiosPrivate)

const handleChange = (e) => {
    const {name, value} = e.target
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
    const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})

    if(!isValid) return

    try {
        const { title, description, level, category, schoolName, schoolCue, privateSchool, schoolEmail } = formValues
        const response = await axiosPrivate.post('/proyecto', 
        JSON.stringify({ titulo: title, descripcion: description, nivel: level, categoria: category, nombreEscuela: schoolName, cueEscuela: schoolCue, privada: privateSchool, emailEscuela: schoolEmail}),
        {
            headers: {'Content-Type': 'application/json'},
            withCredentials: true
        }
        )
        console.log(JSON.stringify(response?.data))
  

        console.log(formValues)

    setFormValues({
        title: '',
        description: '',
        level: '',
        category: '',
        schoolName: '',
        schoolCue: '',
        private: '',
        schoolEmail: ''
    })

    } catch (err) {
        if(!err?.response){
            console.log('El servidor no respondio')
        } else if(err.response?.status === 403) {
            console.log('Datos incorrectos intente nuevamente')
        } else if(err.response?.status === 401) {
            console.log('No estas autorizado para realizar esta operacion')
        } else {
            console.log('Fallo la inscripcion del proyecto')
        }

        }
        console.log('Se mando XD')
}
  

return (
    <form onSubmit={handleSubmit} className='register-project-form'>
        <h2 className='register-project-form__title'> Inscribir proyecto a etapa escolar </h2>
        <div className='register-project-form__input register-project-form__input--first'>
            <InputField
                label='Titulo del proyecto: ' 
                name='title'
                type='text'
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.title}
                errors={errors.title}
                required={true}
            />
        </div>
        <div className='register-project-form__input'>
            <InputField
                label='Descripcion del proyecto: ' 
                name='description'
                type='textarea'
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.description}
                errors={errors.description}
                required={true}
            />
        </div>
        <div className='register-project-form__input'>
            <SelectField
                label='Nivel: ' 
                name='level'
                dataValues={levels?.nivel}
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.level}
                errors={errors.level}
                required={true}
            />
        </div>
        <div className='register-project-form__input'>
            <SelectField
                label='Categoria:' 
                name='category'
                dataValues={categories?.categoria}
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.category}
                errors={errors.category}
                required={true}
            />
        </div>
        <div className='register-project-form__input'>
            <InputField
                label='Nombre de la escuela' 
                name='schoolName'
                type='text'
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.schoolName}
                errors={errors.schoolName}
                required={true}
            />
        </div>
        <div className='register-project-form__input'>
            <InputField
                label='CUE de la escuela' 
                name='schoolCue'
                type='number'
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.schoolCue}
                errors={errors.schoolCue}
                required={true}
            />
        </div>
        <div className='register-project-form__input'>
            <SelectField
                label='¿Pertenece a escuela privada?' 
                name='privateSchool'
                dataValues={[{nombre: 'Privada', _id: true},{nombre: 'Pública', _id: false}]}
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.privateSchool}
                errors={errors.privateSchool}
                required={true}
            />
        </div>
        <div className='register-project-form__input'>
            <InputField
                label='Email de la escuela' 
                name='schoolEmail'
                type='email'
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.schoolEmail}
                errors={errors.schoolEmail}
                required={true}
            />
        </div>
        <div className='register-project-form__button'>
                <Button text='Ingresar' activo={true}/>
        </div>
    </form>
)
}

export default RegisterSchoolStageForm