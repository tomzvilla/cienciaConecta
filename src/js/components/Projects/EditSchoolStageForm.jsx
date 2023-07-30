// Import Components

import InputField from "../../components/InputField/InputField"
import SelectField from "../../components/SelectField/SelectField"
import Button from "../../components/Button/Button"

// Import hooks
import { useState } from "react"
import { useFormValidator } from "../../hooks/useFormValidator"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useNavigate, useLocation } from 'react-router-dom'

const EditSchoolStageForm = ({ formData }) => {

    let isPrivate = '1'
    if(formData.privada === false){
        isPrivate = '0'
    }
    
    const [formValues, setFormValues] = useState({
        title: formData.titulo,
        description: formData.descripcion,
        level: formData.nivel,
        category: formData.categoria,
        schoolName: formData.nombreEscuela,
        schoolCue: formData.cueEscuela,
        privateSchool: isPrivate,
        schoolEmail: formData.emailEscuela,
    })

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/myprojects'

    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

    const { data: categoriesData} = useAxiosFetch('/categoria', axiosPrivate)
    const { data: levelsData} = useAxiosFetch('/nivel', axiosPrivate)

    let categories = []

    if(categoriesData){
        categories = [{_id: 0, nombre: ""}, ...categoriesData.categoria]
    }
    let levels = []
    if(levelsData){
        levels = [{_id: 0, nombre: ""}, ...levelsData.nivel]
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(e.target.name)
        console.log(e.target.value)
        const nextFormValueState = {
            ...formValues,
            [name]: value
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty) {
            validateForm({form: nextFormValueState, errors, name})
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})

        if(!isValid) return

        try {
            const { title, description, level, category, schoolName, schoolCue, privateSchool, schoolEmail } = formValues
            // (privateSchool === '1' && privateSchool !== '0') ? setFormValues(...formValues, privateSchool = true) : setFormValues(...formValues, privateSchool = false)
            const response = await axiosPrivate.patch(`/proyecto/${formData._id}`, 
            JSON.stringify({ titulo: title, descripcion: description, nivel: level, categoria: category, nombreEscuela: schoolName, cueEscuela: schoolCue, privada: privateSchool, emailEscuela: schoolEmail}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
            )
            console.log(JSON.stringify(response?.data))
    

            console.log(formValues)

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

    const handleDelete = async (e) => {
        try {
            e.preventDefault()
            await axiosPrivate.delete(`/proyecto/${formData._id}`)
        } catch (err) {
            console.log(err)
        }
        setTimeout(() => {
            navigate(from, { replace: true })
          }, 2000);
    }
  

return (
    <form onSubmit={handleSubmit} className='edit-project-form'>
        <h2 className='edit-project-form__title'> Editar proyecto </h2>
        <div className='edit-project-form__input edit-project-form__input--first'>
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
        <div className='edit-project-form__input'>
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
        <div className='edit-project-form__input'>
            {!levelsData? <SelectField
                label='Nivel: ' 
                name='level'
                dataValues={['Cargando']}
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.level}
                errors={errors.level}
                required={true}
            />: <SelectField
                label='Nivel: ' 
                name='level'
                dataValues={levels}
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.level}
                errors={errors.level}
                required={true}
            />}
        </div>
        <div className='edit-project-form__input'>
            {!categoriesData ?  
                <SelectField
                    label='Categoria:' 
                    name='category'
                    dataValues={['Cargando']}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.category}
                    errors={errors.category}
                    required={true}
                /> :
                <SelectField
                    label='Categoria:' 
                    name='category'
                    dataValues={categories}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.category}
                    errors={errors.category}
                    required={true}
                />
            }
        </div>
        <div className='edit-project-form__input'>
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
        <div className='edit-project-form__input'>
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
        <div className='edit-project-form__input'>
            <SelectField
                label='¿Pertenece a escuela privada?' 
                name='privateSchool'
                dataValues={[{nombre: '', _id: 2},{nombre: 'Privada', _id: 1},{nombre: 'Pública', _id: 0}]}
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.privateSchool}
                errors={errors.privateSchool}
                required={true}
            />
        </div>
        <div className='edit-project-form__input'>
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
        <div className='edit-project-form__button'>
            <Button text='Borrar' borrar={true} onClickHandler={handleDelete}/>
            <Button text='Actualizar' activo={true}/>
        </div>
    </form>
)
}

export default EditSchoolStageForm