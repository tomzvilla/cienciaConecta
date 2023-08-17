// components
import InputField from "../InputField/InputField"
import FileField from "../FileField/FileField"

const DatosFeriaForm = (props) => {
    const {handleChange, handleDateChange, handleFileChange, onBlurField, formValues, errors} = props
    return (
        <div className="datos-feria-form">
            <h2 className="datos-feria-form__title">Datos de la Feria</h2>
            <div className='datos-feria-form__input'>
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
            <div className='datos-feria-form__input'>
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
            <div className='datos-feria-form__input'>
                <FileField
                    label='Logotipo de la feria: ' 
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
                    label='Fecha inicio de la feria' 
                    name='fechaInicioFeria'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaInicioFeria.split("T")[0]}
                    errors={errors.fechaInicioFeria}
                    required={true}
                />
            </div>
            <div className='datos-feria-form__input'>
                <InputField
                    label='Fecha fin de la feria' 
                    name='fechaFinFeria'
                    type='date'
                    onChange={handleDateChange}
                    onBlur={onBlurField}
                    value={formValues.fechaFinFeria.split("T")[0]}
                    errors={errors.fechaFinFeria}
                    required={true}
                />
            </div>
        </div>
    )
}

export default DatosFeriaForm