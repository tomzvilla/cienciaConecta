import InputField from "../../InputField/InputField";
import ImageButton from "../../ImageButton/ImageButton";



const NuevoCriterio = (props) => {
    return (
        <div className="nuevo-criterio">
            <h5 className="nuevo-criterio__title">Nuevo Criterio</h5>

            <div className="nuevo-criterio__input nuevo-criterio__input--criterio" >
                <InputField
                    label='Criterio: ' 
                    name='nombreCriterio'
                    type={'text'}
                    onChange={props.handleChange}
                    onBlur={props.onBlurField}
                    value={props.nombreCriterio}
                    errors={props.errors.nombreCriterio}
                />
            </div>

            <div className="nuevo-criterio__input nuevo-criterio__input--ponderacion" >
                <InputField
                    label='Ponderacion: ' 
                    name='ponderacion'
                    type={'number'}
                    onChange={props.handleChange}
                    onBlur={props.onBlurField}
                    value={props.ponderacion}
                    errors={props.errors.ponderacion}
                />
            </div>

            <div className="nuevo-criterio__image-container">
                <ImageButton
                alt="Agregar Criterio"
                callback={props.handleSubmit} 
                src={require("../../../../assets/add.png")}
                small={true}
                />
            </div>

            

        </div>

    )
}

export default NuevoCriterio;