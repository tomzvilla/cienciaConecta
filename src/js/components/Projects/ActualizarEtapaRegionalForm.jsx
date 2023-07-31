// components
import InputField from "../InputField/InputField"
import SelectField from "../SelectField/SelectField"
import FileField from "../FileField/FileField"

const ActualizarEtapaRegionalForm = (props) => {

    const {handleChange, onBlurField, formValues, errors, sedes} = props

    return (
        <>
            <div className='edit-project-form__input edit-project-form__input--first'>
                <SelectField
                    label='Sede del Proyecto: ' 
                    name='sede'
                    dataValues={sedes}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.sede}
                    errors={errors.sede}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <InputField
                    label='Enlace a video del proyecto: ' 
                    name='videoPresentacion'
                    type='text'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.videoPresentacion}
                    errors={errors.videoPresentacion}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <FileField
                    label='Carpeta de campo: ' 
                    name='carpetaCampo'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.carpetaCampo}
                    errors={errors.carpetaCampo}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <FileField
                    label='Informe de trabajo: ' 
                    name='informeTrabajo'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.informeTrabajo}
                    errors={errors.informeTrabajo}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <FileField
                    label='Registro Pedagogico: ' 
                    name='registroPedagogico'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.registroPedagogico}
                    errors={errors.registroPedagogico}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <FileField
                    label='Autorización de uso de imagen: ' 
                    name='autorizacionImagen'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.autorizacionImagen}
                    errors={errors.autorizacionImagen}
                    required={true}
                />
            </div>
        </>
    )

}

export default ActualizarEtapaRegionalForm