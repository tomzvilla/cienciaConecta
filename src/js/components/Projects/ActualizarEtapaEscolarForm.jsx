// components
import InputField from "../InputField/InputField"
import SelectField from "../SelectField/SelectField"
const ActualizarEtapaEscolarForm = (props) => {

    const {handleChange, onBlurField, formValues, errors, levels, categories} = props

    return (
        <>
            <div className='edit-project-form__input'>
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
            </div>
            <div className='edit-project-form__input'>
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
        </>
    )

}

export default ActualizarEtapaEscolarForm