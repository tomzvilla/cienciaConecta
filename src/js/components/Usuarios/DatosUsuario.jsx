import BlankState from "../BlankState/BlankState";
import Button from "../Button/Button";

const DatosUsuario = (props) => {

    const editar = props.editar ? true : false

    return (
        <div className="datos-usuario">

            {!props.cargo ? (< BlankState msg='No se encontró al usuario. ¡Intentá de nuevo mas tarde!' />) 
            : 
            <>
                <p className="datos-usuario__dato">Cargo: {props.cargo}</p>  
                <p className="datos-usuario__dato">Teléfono: {props.telefono}</p>
                <p className="datos-usuario__dato">E-mail: {props.email}</p>
                {editar ? <p className="datos-usuario__dato">Contraseña: {props.password}</p> : null}
                <div className="datos-usuario__btn">
                    {
                        editar ?
                        <Button 
                            text='Editar' 
                            onClickHandler={props.onClick}
                            activo={true}
                        />
                        :
                        <Button 
                            text='Activar' 
                            onClickHandler={props.onClick}
                            activo={true}
                        />
                    }
                </div>  
            </>
            }    
        </div>
    )
}

export default DatosUsuario;