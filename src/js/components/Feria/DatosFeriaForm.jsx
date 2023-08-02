// components
import InputField from "../InputField/InputField"
import FileField from "../FileField/FileField"

const DatosFeriaForm = (props) => {
    const {handleChange, handleFileChange, onBlurField, formValues, errors} = props
    return (
        <>
            <div className='edit-project-form__input edit-project-form__input--first'>
                <InputField
                    label='Nombre de la Feria: ' 
                    name='nombreFeria'
                    type='text'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.nombreFeria}
                    errors={errors.nombreFeria}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Descripcion de la feria: ' 
                    name='descripcionFeria'
                    type='textarea'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.descripcionFeria}
                    errors={errors.descripcionFeria}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <FileField
                    label='Logotipo de la feria: ' 
                    name='logo'
                    onChange={handleFileChange}
                    onBlur={onBlurField}
                    errors={errors.logo}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha inicio de la feria' 
                    name='fechaInicioFeria'
                    type='date'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioFeria}
                    errors={errors.fechaInicioFeria}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Fecha fin de la feria' 
                    name='fechaFinFeria'
                    type='date'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinFeria}
                    errors={errors.fechaFinFeria}
                    required={true}
                />
            </div>
        </>
    )
}

export default DatosFeriaForm