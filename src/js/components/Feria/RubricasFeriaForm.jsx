// components
import FeriaRubricaCard from "./FeriaRubrica/FeriaRubricaCard"
import Modal from "../Modal/Modal"
import OpcionesModal from "./FeriaRubrica/OpcionesModal"
import NuevaRubrica from "./FeriaRubrica/NuevaRubrica"
// hooks
import { useState } from "react"
import { useSelector } from "react-redux"

const RubricasFeriaForm = (props) => {

    const { handleChange, onBlurField, errors, formValues, setFormValues, handleDeleteRubrica } = props
    const rubricasAlmacenadas = useSelector(state => state.feria.rubricas)
    const [showModal, setShowModal] = useState(false)
    const [selectedCriterio, setSelectedCriterio] = useState(null)
    const [selectedRubrica, setSelectedRubrica] = useState(null)
    
    const sumarPonderaciones = () => {
        let suma = 0;
        rubricasAlmacenadas?.forEach((rubrica) => {
            suma += parseInt(rubrica.ponderacionRubrica); 
        });
        return suma;
    };

    const ponderacionRubricas = sumarPonderaciones()

    const cerrarModal = () => {
        setShowModal(false)
    }

    const abrirOpciones = (e, rubrica, criterio) => {
        e.preventDefault()
        setSelectedCriterio(criterio)
        setSelectedRubrica(rubrica)
        setShowModal(true)
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
                {!rubricasAlmacenadas ? (<p className="feria-rubrica-form__blank">No hay rúbricas para la feria</p>) : rubricasAlmacenadas.map((r,index) => 
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
                        />
                    )
                )}
                {rubricasAlmacenadas?.length >= 1 && ponderacionRubricas !== 100 ? <div className="feria-rubrica-card__error">La suma de las ponderaciones de las rúbricas debe dar 100</div> : null}            
            </div>


            <NuevaRubrica />
        </>
    )
}

export default RubricasFeriaForm