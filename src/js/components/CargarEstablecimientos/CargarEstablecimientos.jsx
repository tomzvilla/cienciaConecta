import Button from "../Button/Button";
import FileField from "../FileField/FileField";
import dropdown from '../../../assets/down-arrow.png'
import { useState } from "react";

const CargarEstablecimientos = (props) => {
    const [showDropdown, setShowDropdown] = useState(false)
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

    const handleDropdown = () => {
        let value = !showDropdown

        setShowDropdown(value)
    }

    return (
            <div className="cargar-establecimientos">
                <p className="cargar-establecimientos__text">Para cargar los establecimientos, por favor carga el Excel y tené en cuenta los criterios del archivo:</p>

                <div className="cargar-establecimientos__dropdown-title" onClick={handleDropdown}>
                    <p>Criterios a seguir en el Excel</p>
                    <img src={dropdown} alt="dropdown arrow" />
                </div>

                {showDropdown ? 
                <div className="cargar-establecimientos__dropdown-text">
                    <p>El padrón con establecimientos educativos se debe obtener de la página oficial de la Nación, desde  {" "}
                        <a className="cargar-establecimientos__link" href="https://www.argentina.gob.ar/educacion/evaluacion-e-informacion-educativa/padron-oficial-de-establecimientos-educativos" target="_blank" rel="noopener noreferrer">esta página</a>.
                        El archivo debe contener un mínimo de 5000 filas (establecimientos) y debe tener una sola hoja con las siguientes columnas (orden y nombres):
                    </p>
                    <ul>
                        <li>Columna A: Jurisdicción</li>
                        <li>Columna D: Departamento</li>
                        <li>Columna F: Localidad</li>
                        <li>Columna H: Cue Anexo</li>
                        <li>Columna I: Nombre</li>
                        <li>Columna J: Domicilio</li>
                        <li>Columna K: Código Postal</li>
                        <li>Columna L: Teléfono</li>
                        <li>Columna M: Email</li>
                    </ul>
                </div>
                    : ""
                }
                
                <div className="cargar-establecimientos__file-field">
                    <FileField
                    label='Establecimientos: ' 
                    name='excel'
                    onChange={handleFileChange}
                    onBlur={onBlurField}
                    errors={errors.excel}
                    accept={'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
                    required={true}
                    />
                </div>
                
                <div className="cargar-establecimientos__button">
                    <Button text="Cargar" activo={true} onClickHandler={handleSubmit}/>
                </div>
            </div>
    );
}

export default CargarEstablecimientos;