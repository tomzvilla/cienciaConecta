// components
import OpcionesModal from "./OpcionesModal"
// hooks
import { useState } from "react"

const CriteriosTable = (props) => {

    const { rubrica, formValues, setFormValues, handleDeleteCriterio } = props

    const [showModal, setShowModal] = useState(false)
    const [selectedCriterio, setSelectedCriterio] = useState(null)

    const cerrarModal = () => {
        setShowModal(false)
    }

    const abrirOpciones = (criterio) => {
        setSelectedCriterio(criterio)
        setShowModal(true)
    }

    return (
        rubrica?.criterios?.length === 0 ? 
        (   
            <p> No hay criterios cargados para esta rubrica</p>
        ) 
        :
        (
            showModal ? (<OpcionesModal formValues={formValues} setFormValues={setFormValues} cerrarModal={cerrarModal} criterio={selectedCriterio} rubrica={rubrica} />) : (
            <table>
                <thead>
                    <tr>
                        <th>Criterios</th>
                        <th>Ponderacion</th>
                        <th>Opciones</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {rubrica.criterios.map((c, index) =>
                        (
                            <tr key={index}>
                                <td>{c.nombre} </td> 
                                <td>{c.ponderacion} </td> 
                                <td> 
                                    <button onClick={() => abrirOpciones(c)}>
                                        Opciones
                                    </button>
                                </td> 
                                <td>
                                    <button onClick={(e) => handleDeleteCriterio(e, c.nombre)}>
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            )
        )
    )

}

export default CriteriosTable