// components
import FileField from "../FileField/FileField"

const PostulacionDatos = (props) => {

    const {formValues, setFormValues, validateForm, errors, onBlurField} = props


    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const {name} = e.target
        const nextFormValueState = {
            ...formValues,
            curriculum: file
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty){
            validateForm({form: nextFormValueState, errors, name})
        }

    }

    return(
        <div className='sedes-feria-form__input'>
            <FileField
                label='Curriculum Vitae: ' 
                name='curriculum'
                onChange={handleFileChange}
                onBlur={onBlurField}
                errors={errors.curriculum}
                accept={'.pdf'}
                required={true}
            />
        </div>
        
    )
}

export default PostulacionDatos