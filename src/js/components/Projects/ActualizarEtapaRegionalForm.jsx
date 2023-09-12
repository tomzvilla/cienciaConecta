// components
import InputField from "../InputField/InputField"
import SelectField from "../SelectField/SelectField"
import FileField from "../FileField/FileField"

// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const ActualizarEtapaRegionalForm = (props) => {

    const {handleChange, handleFileChange, onBlurField, formValues, errors} = props

    const axiosPrivate = useAxiosPrivate()
    const { data: sedesData} = useAxiosFetch('/establecimiento/sedes/regional', axiosPrivate)
    let sedes = []
    if(sedesData){
        sedes = [{_id: 0, nombre: ""}, ...sedesData.sedes].sort((sede1, sede2) => {
            if (sede1.nombre < sede2.nombre) {
              return -1; 
            } else if (sede1.nombre > sede2.nombre) {
              return 1;
            }
            return 0;
          });
    }

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