// components
import InputField from "../InputField/InputField"
import SelectField from "../SelectField/SelectField"
import Autocomplete from "../Autocomplete/Autocomplete"
const ActualizarEtapaEscolarForm = (props) => {

    const {handleChange, onBlurField, formValues, errors, levels, categories, search, results, handleFilter, handleFocus, handleSelect, autocompleteValue} = props

    return (
        <>
            <h2 className='project-form__subtitle'>Datos del proyecto: </h2>
            <div className='project-form__input'>
                <InputField
                    label='Título: ' 
                    name='title'
                    type='text'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.title}
                    errors={errors.title}
                    required={true}
                />
            </div>
            <div className='project-form__input'>
                <InputField
                    label='Descripción: ' 
                    name='description'
                    type='textarea'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.description}
                    errors={errors.description}
                    required={true}
                />
            </div>
            <div className='project-form__input'>
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
            <div className='project-form__input'>
                <SelectField
                    label='Categoría:' 
                    name='category'
                    dataValues={categories}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.category}
                    errors={errors.category}
                    required={true}
                />
            </div>
            <h2 className='project-form__subtitle'>Datos del establecimiento educativo: </h2>
            <div className='project-form__input'>
                <SelectField
                    label='Deparamento: ' 
                    name='departamento'
                    dataValues={search?.departamentos}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.departamento}
                    errors={errors.departamento}
                    required={true}
                />
            </div>
            <div className='project-form__input'>
                <SelectField
                    label='Localidad: ' 
                    name='localidad'
                    dataValues={search?.localidades}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.localidad}
                    errors={errors.localidad}
                    required={true}
                    disabled={!formValues.departamento}
                />
            </div>
            <div className='project-form__input'>
                <Autocomplete 
                    results={results} 
                    onChange={handleFilter} 
                    onFocus={handleFocus}
                    onSelect={(item) => handleSelect(item)}
                    disabled={!formValues.localidad}
                    renderItem={(item) => <p> {item.nombre} </p>}
                    value={autocompleteValue?.nombre}
                />
            </div>
            <div className='project-form__input'>
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
            <div className='project-form__input'>
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