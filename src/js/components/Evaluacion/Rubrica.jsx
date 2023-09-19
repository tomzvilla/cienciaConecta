// components
import SelectField from "../SelectField/SelectField"

const Rubrica = ({ rubrica, display }) => {
    
    const handleChange = () => {
        console.log('TODO DEFINIR SELECCION DE RUBRICA')
    }

    return (

        <div>
            <h2>{rubrica.nombreRubrica}</h2>
            {rubrica.criterios.map(criterio => {
                return (<div className="postulacion-form__input">
                <SelectField
                    label={`${criterio.nombre}: `} 
                    name={criterio.nombre}
                    dataValues={criterio.opciones}
                    onChange={handleChange}
                    onBlur={() => {}}
                    errors={null}
                    required={true}
                />
                </div>)
            })}
            <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
    )

}

export default Rubrica