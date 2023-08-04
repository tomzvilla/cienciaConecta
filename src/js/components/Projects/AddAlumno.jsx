import InputField from "../InputField/InputField"
import ImageButton from "../ImageButton/ImageButton";

const AddAlumno = (props) => {
    return (
        <div className="add-alumno">
            <div className="add-alumno__alumno">
                    <InputField
                        label='Apellido:' 
                        name='lastname'
                        type='text'
                        onChange={props.handleChange}
                        onBlur={props.onBlurField}
                        value={props.alumno.lastname}
                        errors={props.errors.lastname}
                        required={true}
                    />
            </div>
            <div className="add-alumno__alumno">
                    <InputField
                        label='Nombre:' 
                        name='name'
                        type='text'
                        onChange={props.handleChange}
                        onBlur={props.onBlurField}
                        value={props.alumno.name}
                        errors={props.errors.name}
                        required={true}
                    />
                </div>
                <div className="add-alumno__alumno">
                    <InputField
                        label='DNI:' 
                        name='dni'
                        type='number'
                        onChange={props.handleChange}
                        onBlur={props.onBlurField}
                        value={props.alumno.dni}
                        errors={props.errors.dni}
                        required={true}
                    />
                </div>

                <div className="add-alumno__alumno">
                    <ImageButton small={true} src={require("../../../assets/add.png")} callback={props.handleAdd} text="Añadir"/>
                </div>
                
                
            </div>
    );
}

export default AddAlumno;