import Button from "../Button/Button";
import FileField from "../FileField/FileField";
import dropdown from '../../../assets/down-arrow.png'

const CargarEstablecimientos = (props) => {

    const {formValues, setFormValues, validateForm, errors, onBlurField, handleSubmit} = props

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const {name} = e.target
        const nextFormValueState = {
            ...formValues,
            excel: file
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty){
            validateForm({form: nextFormValueState, errors, name})
        }
    }

    return (
            <div className="cargar-establecimientos">
                <div>
                    <h4>Criterios a seguir en el Excel</h4>
                    <img src={dropdown} alt="dropdown arrow" />
                </div>
                <div>
                    <p>El padrón con establecimientos educativos se debe obtener de la página oficial de la Nacion, desde  
                        <a href="https://www.argentina.gob.ar/educacion/evaluacion-e-informacion-educativa/padron-oficial-de-establecimientos-educativos" target="_blank" rel="noopener noreferrer"> aquí</a>.
                        El archivo debe contener un mínimo de 5000 filas (establecimientos) y debe tener una sola hoja con las siguientes columnas (orden y nombres):
                    </p>
                    <ul>
                        <li>Columna A: Jurisdicción</li>
                        <li>Columna D: Departamento</li>
                        <li>Columna F: Localidad</li>
                        <li>Columna H: Cue Anexo</li>
                        <li>Columna I: Nombre</li>
                        <li>Columna J: Domicilio</li>
                        <li>Columna K: CP</li>
                        <li>Columna L: Teléfono</li>
                        <li>Columna M: Email</li>
                    </ul>
                </div>
                <p className="cargar-establecimientos__text">Para cargar los establecimientos, por favor carga el excel utilizando el botón debajo:</p>
                <FileField
                label='Establecimientos: ' 
                name='excel'
                onChange={handleFileChange}
                onBlur={onBlurField}
                errors={errors.excel}
                accept={'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
                required={true}
                />
                <div className="cargar-establecimientos__button">
                    <Button text="Cargar" activo={true} onClickHandler={handleSubmit}/>
                </div>
            </div>
    );
}

export default CargarEstablecimientos;