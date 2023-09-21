// components
import InputField from "../InputField/InputField"
import FileField from "../FileField/FileField"

const DatosFeriaForm = (props) => {
    const {handleChange, handleDateChange, handleFileChange, onBlurField, formValues, errors, disabled = {}} = props
    return (
        <div className="datos-feria-form">
            <h2 className="datos-feria-form__title">Datos de la Feria</h2>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Nombre: ' 
                    name='nombreFeria'
                    type='text'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.nombreFeria}
                    errors={errors.nombreFeria}
                    required={true}
                />
            </div>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Descripcion: ' 
                    name='descripcionFeria'
                    type='textarea'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.descripcionFeria}
                    errors={errors.descripcionFeria}
                    required={true}
                />
            </div>
            <div className='datos-feria-form__input'>
                <FileField
                    label='Logotipo: ' 
                    name='logo'
                    onChange={handleFileChange}
                    onBlur={onBlurField}
                    errors={errors.logo}
                    accept={'image/*'}
                    required={true}
                />
            </div>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Fecha inicio' 
                    name='fechaInicioFeria'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioFeria.split("T")[0]}
                    errors={errors.fechaInicioFeria}
                    required={true}
                    disabled={disabled?.fechaInicioFeria || false}
                />
            </div>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Fecha fin' 
                    name='fechaFinFeria'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinFeria.split("T")[0]}
                    errors={errors.fechaFinFeria}
                    required={true}
                    disabled={disabled?.fechaFinFeria || false}
                />
            </div>
        </div>
    )
}

export default DatosFeriaForm