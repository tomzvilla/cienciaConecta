// components
import FeriaRubricaCard from "./FeriaRubrica/FeriaRubricaCard"
import Modal from "../Modal/Modal"
import OpcionesModal from "./FeriaRubrica/OpcionesModal"
import NuevaRubrica from "./FeriaRubrica/NuevaRubrica"
// hooks
import { useState } from "react"
import { useSelector } from "react-redux"

const RubricasFeriaForm = (props) => {

    let rubricasAlmacenadas = useSelector(state => state.feria.rubricas)
    const [showModal, setShowModal] = useState(false)
    const [selectedCriterio, setSelectedCriterio] = useState(null)
    const [selectedRubrica, setSelectedRubrica] = useState(null)
    
    const sumarPonderacionesTeoricas = () => {
        let suma = 0;
        rubricasAlmacenadas?.forEach((rubrica) => {
            if(!rubrica.exposicion)
                suma += parseInt(rubrica.ponderacion); 
        });
        return suma;
    };
    const sumarPonderacionesExpo = () => {
        let suma = 0;
        rubricasAlmacenadas?.forEach((rubrica) => {
            if(rubrica.exposicion)
                suma += parseInt(rubrica.ponderacion); 
        });
        return suma;
    };

    const ponderacionRubricasTeoricas = sumarPonderacionesTeoricas()
    const ponderacionRubricasExpo = sumarPonderacionesExpo()


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
                    component={<OpcionesModal criterio={selectedCriterio} rubrica={selectedRubrica} />}
                    setIsOpen={setShowModal}
                />}

            <div className="feria-rubrica-form">
            <h2 className='feria-rubrica-form__title'>Rúbricas </h2>
                {!rubricasAlmacenadas ? (<p className="feria-rubrica-form__blank">No hay rúbricas para la feria</p>) : rubricasAlmacenadas.map((r,index) => 
                    (
                        <FeriaRubricaCard 
                            key={index}
                            rubrica={r} 
                            abrirOpciones={abrirOpciones}
                        />
                    )
                )}
                {!rubricasAlmacenadas.some(r => !r.exposicion) ? <div className="feria-rubrica-card__error">Se debe ingresar como mínimo una rúbrica teórica</div> : null}
                {!rubricasAlmacenadas.some(r => r.exposicion) ? <div className="feria-rubrica-card__error">Se debe ingresar como mínimo una rúbrica de exposición</div> : null}      
                { ponderacionRubricasTeoricas !== 100 ? <div className="feria-rubrica-card__error">La suma de las ponderaciones de las rúbricas teóricas debe dar 100</div> : null}
                { ponderacionRubricasExpo !== 100 ? <div className="feria-rubrica-card__error">La suma de las ponderaciones de las rúbricas de exposición debe dar 100</div> : null}
            </div>


            <div className="feria-rubrica-form__nueva-rubrica">
                <NuevaRubrica />  
            </div>
        </>
    )
}

export default RubricasFeriaForm