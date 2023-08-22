import InputField from "../../InputField/InputField";
import ImageButton from "../../ImageButton/ImageButton";

const AddOpcion = (props) => {
    return (
        <div className="add-opcion">
            <div className="add-opcion__opcion">
                    <InputField
                        label='Nombre: ' 
                        name='nombreOpcion'
                        type='text'
                        onChange={props.handleChange}
                        onBlur={props.onBlurField}
                        value={props.opcion.nombreOpcion}
                        errors={props.errors.nombreOpcion}
                    />
            </div>
    

                <div className="add-opcion__opcion">
                    <ImageButton small={true} src={require("../../../../assets/add.png")} callback={props.handleAdd} text="Añadir"/>
                </div>
                
                
            </div>
    );
}

export default AddOpcion;