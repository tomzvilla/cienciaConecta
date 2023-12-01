import Button from "../Button/Button";
import FileField from "../FileField/FileField";

const CargarEstablecimientos = (props) => {

    const {formValues, setFormValues, validateForm, errors, onBlurField, handleSubmit} = props

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const {name} = e.target
        const nextFormValueState = {
            ...formValues,
            excel: file
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty){
            validateForm({form: nextFormValueState, errors, name})
        }
    }

    return (
            <div className="cargar-establecimientos">
                <p className="cargar-establecimientos__text">Para cargar los establecimientos, por favor carga el excel utilizando el botón debajo:</p>
                <FileField
                label='Establecimientos: ' 
                name='excel'
                onChange={handleFileChange}
                onBlur={onBlurField}
                errors={errors.excel}
                accept={'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
                required={true}
                />
                <div className="cargar-establecimientos__button">
                    <Button text="Cargar" activo={true} onClickHandler={handleSubmit}/>
                </div>
            </div>
    );
}

export default CargarEstablecimientos;