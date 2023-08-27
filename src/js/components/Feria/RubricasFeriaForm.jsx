// components
import FeriaRubricaCard from "./FeriaRubrica/FeriaRubricaCard"
import Button from "../Button/Button"
import InputField from "../InputField/InputField"
import Modal from "../Modal/Modal"
import OpcionesModal from "./FeriaRubrica/OpcionesModal"

// hooks
import { useState } from "react"
import NuevaRubrica from "./FeriaRubrica/NuevaRubrica"
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
        <>

        {showModal && 
            <Modal
                title="Datos de la Opción"
                component={<OpcionesModal formValues={formValues} setFormValues={setFormValues} cerrarModal={cerrarModal} criterio={selectedCriterio} rubrica={selectedRubrica} />}
                setIsOpen={setShowModal}
            />}

        <div className="feria-rubrica-form">
        <h2 className='feria-rubrica-form__title'>Rúbricas </h2>
            {rubricas?.length === 0 ? (<p className="feria-rubrica-form__blank">No hay rúbricas para la feria</p>) : rubricas.map((r,index) => 
                (
                    <FeriaRubricaCard 
                        key={index}
                        rubrica={r} 
                        handleChange={handleChange}
                        abrirOpciones={abrirOpciones}
                        onBlurField={onBlurField}
                        formValues={formValues}
                        setFormValues={setFormValues}
                        errors={errors}
                        handleDeleteRubrica={handleDelete}
                    />
                )
            )}


            
            
        </div>


        <NuevaRubrica  
            handleSubmit={handleSubmit} handleChange={handleChange} 
            onBlurField={onBlurField} nombreRubrica={formValues.nombreRubrica} 
            errors={errors.nombreRubrica}
        />
        </>
    )
}

export default RubricasFeriaForm