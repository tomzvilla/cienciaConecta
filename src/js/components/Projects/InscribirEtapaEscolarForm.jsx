// components

import InputField from "../InputField/InputField"
import SelectField from "../SelectField/SelectField"
import Button from "../Button/Button"

// hooks
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useFormValidator } from "../../hooks/useFormValidator"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

import Swal from "sweetalert2"

const InscribirEtapaEscolarForm = () => {
    
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
const navigate = useNavigate()
const location = useLocation()
const from = location.state?.from?.pathname || '/dashboard'

const {errors, validateForm, onBlurField} = useFormValidator(formValues)

const { data: categoriesData} = useAxiosFetch('/categoria', axiosPrivate)
const { data: levelsData} = useAxiosFetch('/nivel', axiosPrivate)
let categories = []
if(categoriesData){
    categories = [{_id: 0, nombre: ""}, ...categoriesData.categoria]
}
let levels = []
if(levelsData){
    levels = [{_id: 0, nombre: "", codigo: '0'}, ...levelsData.nivel].sort((level1, level2) => {
        if (level1.codigo < level2.codigo) {
          return -1; 
        } else if (level1.codigo > level2.codigo) {
          return 1;
        }
        return 0;
      });
}
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

    Swal.fire({
        title: '¿Deseas inscribir tu proyecto a la etapa escolar?',
        icon: 'question',
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: 'Inscribir',
        confirmButtonColor: '#00ACE6',
        cancelButtonText: 'Cancelar',
        cancelButtonColor: '#D4272D',
    }).then(async (result) => {
        if(result.isConfirmed) {
            const success = await inscribirProyecto()
            if(success) Swal.fire({
                title: '¡Proyecto Inscripto!',
                text: 'Inscribiste tu proyecto con éxito',
                icon: 'success',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#00ACE6',
            }).then((result) => {
                if(result.isConfirmed || result.isDismissed) {
                    setFormValues({
                        title: '',
                        description: '',
                        level: '',
                        category: '',
                        schoolName: '',
                        schoolCue: '',
                        privateSchool: '',
                        schoolEmail: ''
                    })
                    navigate(from, { replace: true })
                }
            })
      }})

    const inscribirProyecto = async () => {
        try {
            const { title, description, level, category, schoolName, schoolCue, privateSchool, schoolEmail } = formValues
            const response = await axiosPrivate.post('/proyecto', 
            JSON.stringify({ titulo: title, descripcion: description, nivel: level, categoria: category, nombreEscuela: schoolName, cueEscuela: schoolCue, privada: privateSchool, emailEscuela: schoolEmail}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
            )
            return true
    
        } 
        catch (err) {
            let msg = ''
            console.log(JSON.stringify(err.response.data))
            if(!err?.response){
              msg = 'El servidor no respondió'
            } else if(err.response?.status === 403) {
              msg = 'Datos incorrectos intente nuevamente'
            } else if(err.response?.status === 401) {
              msg = 'No estas autorizado para realizar esta operación'
            } else {
              msg = `Falló la inscripción <br> ${err.response.data.error}`
            }
            Swal.fire({
              html: msg,
              title: 'Fallo la inscripción',
              icon: 'error',
              confirmButtonText: 'OK',
              confirmButtonColor: '#00ACE6',
            })
        }
        
    }

}
  

return (
    <form onSubmit={handleSubmit} className='register-project-form'>
        <h2 className='register-project-form__title'> Inscribir proyecto a etapa escolar </h2>
        <div className='register-project-form__input'>
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
                label='Descripción del proyecto: ' 
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
        <div className='register-project-form__input'>
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
                dataValues={[{nombre: '', _id: 2},{nombre: 'Privada', _id: 1},{nombre: 'Pública', _id: 0}]}
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

export default InscribirEtapaEscolarForm