import BlankState from "../BlankState/BlankState";
import Button from "../Button/Button";

const DatosUsuario = (props) => {

    return (
        <div className="datos-usuario">

            {!props.cargo ? (< BlankState msg='No se encontró al usuario. ¡Intentá de nuevo mas tarde!' />) 
            : 
            <>
                <p className="datos-usuario__dato">Cargo: {props.cargo}</p>  
                <p className="datos-usuario__dato">Teléfono: {props.telefono}</p>
                <p className="datos-usuario__dato">E-mail: {props.email}</p>   
                <div className="datos-usuario__btn">
                    <Button 
                        text='Activar' 
                        onClickHandler={props.onClick}
                        activo={true}
                    />
                </div>  
            </>
        }




            
            
        </div>
    )
}

export default DatosUsuario;