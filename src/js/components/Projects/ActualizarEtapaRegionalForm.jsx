// components
import InputField from "../InputField/InputField"
import SelectField from "../SelectField/SelectField"
import FileField from "../FileField/FileField"

const ActualizarEtapaRegionalForm = (props) => {

    const {handleChange, handleFileChange, onBlurField, formValues, errors, sedes} = props

    return (
        <>
            <div className='edit-project-form__input'>
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
                    onChange={handleFileChange}
                    onBlur={onBlurField}
                    errors={errors.carpetaCampo}
                    accept={'.pdf'}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <FileField
                    label='Informe de trabajo: ' 
                    name='informeTrabajo'
                    onChange={handleFileChange}
                    onBlur={onBlurField}
                    errors={errors.informeTrabajo}
                    accept={'.pdf'}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <FileField
                    label='Registro Pedagogico: ' 
                    name='registroPedagogico'
                    onChange={handleFileChange}
                    onBlur={onBlurField}
                    errors={errors.registroPedagogico}
                    accept={'.pdf'}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
                <FileField
                    label='Autorización de uso de imagen: ' 
                    name='autorizacionImagen'
                    onChange={handleFileChange}
                    onBlur={onBlurField}
                    errors={errors.autorizacionImagen}
                    accept={'.pdf'}
                    required={true}
                />
            </div>
        </>
    )

}

export default ActualizarEtapaRegionalForm