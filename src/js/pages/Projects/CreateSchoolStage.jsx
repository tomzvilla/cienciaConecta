// Import Components

import InputField from "../../components/InputField/InputField"
import SelectField from "../../components/SelectField/SelectField"
import Button from "../../components/Button/Button"

// Import hooks
import { useState } from "react"
import { useFormValidator } from "../../hooks/useFormValidator"

// Other imports

import { axiosPrivate } from "../../../api/axios"

const levels = ["Primario","Secundario Bajo", "Secundario Alto", "Terciario"]
const categories = ["Ciencias Sociales","Ciencias Naturales", "Matematica", "Robotica"]

const CreateSchoolStage = () => {
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

    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

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
        <div className='project'>
          <form onSubmit={handleSubmit} className='project__form'>
            <h2 className='project__title'> Inscribir proyecto a etapa escolar </h2>
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
            <SelectField
                label='Nivel: ' 
                name='level'
                dataValues={levels}
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.level}
                errors={errors.level}
                required={true}
            />
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
            <SelectField
                label='¿Pertenece a escuela privada?' 
                name='privateSchool'
                dataValues={['Publica', 'Privada']}
                onChange={handleChange}
                onBlur={onBlurField}
                value={formValues.privateSchool}
                errors={errors.privateSchool}
                required={true}
            />
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
          <Button text='Inscribir Proyecto'/>
          </form>
    </div>
    )

}

export default CreateSchoolStage