import Button from "../../Button/Button"
import InputField from "../../InputField/InputField"
import ImageButton from "../../ImageButton/ImageButton"



const NuevaRubrica = (props) => {
    return (
        <div className="nueva-rubrica">
            <h5 className="nueva-rubrica__title">Nueva Rúbrica</h5>
            <div className="nueva-rubrica__input" >
                <InputField
                    label='Nombre: ' 
                    name={`nombreRubrica`}
                    onChange={props.handleChange}
                    onBlur={(props.onBlurField)}
                    value={props.nombreRubrica}
                    errors={props.errors}
                    onFocusOut
                    required={true}
                />
            </div>

            <div className="nueva-rubrica__image-container">
                <ImageButton
                alt="Agregar Rubrica"
                callback={props.handleSubmit} 
                src={require("../../../../assets/add.png")}
                small={true}
                />
            </div>

            

        </div>

    )
}

export default NuevaRubrica