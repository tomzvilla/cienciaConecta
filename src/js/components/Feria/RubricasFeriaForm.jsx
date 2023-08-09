// components
import FeriaRubricaCard from "./FeriaRubrica/FeriaRubricaCard"
import Button from "../Button/Button"
import InputField from "../InputField/InputField"
const RubricasFeriaForm = (props) => {

    const { handleChange, onBlurField, errors, formValues, setFormValues, handleAddRubrica, handleDeleteRubrica } = props
    const rubricas = formValues.criteriosEvaluacion

    const handleSubmit = (e) => {
        e.preventDefault()
        if(errors.nombreRubrica.message !== "") return
        handleAddRubrica({nombre: formValues.nombreRubrica})
    }

    const handleDelete = (e, nombreRubrica) => {
        e.preventDefault()
        handleDeleteRubrica(nombreRubrica)
    }

    return (
        <div>
            {!rubricas ? (<p>No hay rubricas para la feria</p>) : rubricas.map(r => 
                (
                    <FeriaRubricaCard 
                        rubrica={r} 
                        handleChange={handleChange}
                        onBlurField={onBlurField}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        errors={errors}
                        handleDeleteRubrica={(e) => handleDelete(e, r.nombreRubrica)}
                    />
                )
            )}
            <h2>Datos de la rubrica</h2>
            <div className='edit-project-form__input'>
                <InputField
                    label='Nombre: ' 
                    name={`nombreRubrica`}
                    onChange={handleChange}
                    onBlur={(onBlurField)}
                    value={formValues.nombreRubrica}
                    errors={errors.nombreRubrica}
                    onFocusOut
                    required={true}
                />
            </div>
            <Button 
                text={'Agregar'} 
                onClickHandler={handleSubmit} 
                activo={true}
            />
        </div>
    )
}

export default RubricasFeriaForm