// components
import TextareaInput from "../TextareaInput/TextareaInput"

// hooks

const DevolucionForm = (props) => {
    
    return(
        <>
            {props.rubricas?.map((rubrica, index) => (
                <div className="rubrica" key={rubrica.rubrica}>
                    <h5 key={index} className="rubrica__nombre">{rubrica.rubrica} </h5>
                    <div className="rubrica__input" >
                        <TextareaInput disabled={true} label={''} name={rubrica.rubrica} value={rubrica.comentario} />
                    </div>
                </div>
            ))}
        </>
    )
}

export default DevolucionForm