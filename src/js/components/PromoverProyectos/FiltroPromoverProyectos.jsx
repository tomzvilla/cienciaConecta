// components
import SelectField from "../SelectField/SelectField"

const FiltroPromoverProyectos = (props) => {
    return (        
        <>
            <div className="postulacion-form">
                <div className="postulacion-form__input">
                    <SelectField
                        label='Sedes: ' 
                        name='sedeSeleccionada'
                        dataValues={props.sedes}
                        onChange={props.handleChange}
                        onBlur={() => {}}
                        errors={null}
                        required={true}
                    />
                </div>
                <div className="postulacion-form__input">
                    <SelectField
                        label='Niveles: ' 
                        name='nivelSeleccionado'
                        dataValues={props.niveles}
                        onChange={props.handleChange}
                        onBlur={() => {}}
                        errors={null}
                        required={true}
                    />
                </div>
                <div className="postulacion-form__input">
                    <SelectField
                        label='Categorías: ' 
                        name='categoria'
                        dataValues={props.categorias}
                        onChange={props.handleChange}
                        onBlur={() => {}}
                        errors={null}
                        required={true}
                    />
                </div>
            </div>
        </>
    )


}

export default FiltroPromoverProyectos
