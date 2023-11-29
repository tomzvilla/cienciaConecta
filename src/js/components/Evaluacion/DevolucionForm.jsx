// components
import Card from "../Card/Card"
import TextareaInput from "../TextareaInput/TextareaInput"
// hooks
const DevolucionForm = (props) => {
    
    return(
        <div className="rubrica">
            {props.rubricas?.map((rubrica, index) => (
                <div key={rubrica.rubrica}>
                    <h5 key={index} className="rubrica__nombre">{rubrica.rubrica} </h5>
                    <div className="rubrica__input" >
                        <TextareaInput disabled={true} label={''} name={rubrica.rubrica} value={rubrica.comentario} />
                    </div>
                </div>
            ))}
        </div>
    )

}

export default DevolucionForm