// components
import FeriaRubricaCard from "./FeriaRubrica/FeriaRubricaCard"
import Button from "../Button/Button"
import InputField from "../InputField/InputField"
import OpcionesModal from "./FeriaRubrica/OpcionesModal"

// hooks
import { useState } from "react"
const RubricasFeriaForm = (props) => {

    const { handleChange, onBlurField, errors, formValues, setFormValues, handleAddRubrica, handleDeleteRubrica } = props
    const rubricas = formValues.criteriosEvaluacion
    const [showModal, setShowModal] = useState(false)
    const [selectedCriterio, setSelectedCriterio] = useState(null)
    const [selectedRubrica, setSelectedRubrica] = useState(null)

    const cerrarModal = () => {
        setShowModal(false)
    }

    const abrirOpciones = (e, rubrica, criterio) => {
        e.preventDefault()
        setSelectedCriterio(criterio)
        setSelectedRubrica(rubrica)
        setShowModal(true)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(errors.nombreRubrica.message !== "") return
        if(formValues.criteriosEvaluacion.find(r => r.nombreRubrica === formValues.nombreRubrica)) return
        handleAddRubrica({nombre: formValues.nombreRubrica})
    }

    const handleDelete = (e, nombreRubrica) => {
        e.preventDefault()
        handleDeleteRubrica(nombreRubrica)
    }

    return (
        <div>
            {showModal && (<OpcionesModal formValues={formValues} setFormValues={setFormValues} cerrarModal={cerrarModal} criterio={selectedCriterio} rubrica={selectedRubrica} />)}
            {!rubricas ? (<p>No hay rubricas para la feria</p>) : rubricas.map(r => 
                (
                    <FeriaRubricaCard 
                        rubrica={r} 
                        handleChange={handleChange}
                        abrirOpciones={abrirOpciones}
                        onBlurField={onBlurField}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        errors={errors}
                        handleDeleteRubrica={(e) => handleDelete(e, r.nombreRubrica)}
                    />
                )
            )}
            <h2>Datos de la rubrica</h2>
            <div className='edit-project-form__input'>
                <InputField
                    label='Nombre: ' 
                    name={`nombreRubrica`}
                    onChange={handleChange}
                    onBlur={(onBlurField)}
                    value={formValues.nombreRubrica}
                    errors={errors.nombreRubrica}
                    onFocusOut
                    required={true}
                />
            </div>
            <Button 
                text={'Agregar'} 
                onClickHandler={handleSubmit} 
                activo={true}
            />
        </div>
    )
}

export default RubricasFeriaForm