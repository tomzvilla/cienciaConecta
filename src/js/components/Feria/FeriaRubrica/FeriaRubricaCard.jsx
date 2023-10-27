// components
import ImageButton from "../../ImageButton/ImageButton"
import Table from "../../Table/Table"
import NuevoCriterio from "./NuevoCriterio"
import Card from "../../Card/Card"

// hooks
import { useState } from "react"
import { useFormValidator } from "../../../hooks/useFormValidator"
import { useDispatch, useSelector } from "react-redux"
import { feriaActions } from "../../../../store/feria-slice"

const headers = [
    {name: 'Criterios', value: 'nombre'},
    {name: 'Ponderación', value: 'ponderacion'},
]

const FeriaRubricaCard = (props) => {

    const { rubrica, abrirOpciones } = props
    const dispatch = useDispatch()

    const sumarPonderacionesCriterios = () => {
        let suma = 0;
        rubrica?.criterios?.forEach((criterio) => {
            suma += parseInt(criterio.ponderacion); 
        });
        return suma;
    };

    const ponderacionesCriterios = sumarPonderacionesCriterios()

    const handleBorrarCriterio = (e, item) => {
        e.preventDefault()
        dispatch(feriaActions.borrarCriterio({rubrica, criterio: item}))
    }

    const handleBorrarRubrica = (e) => {
        e.preventDefault()
        dispatch(feriaActions.borrarRubrica(rubrica))
    }


    const handleOpciones = (e, criterio) => {
        e.preventDefault()
        abrirOpciones(e, rubrica, criterio)

    }

    return (
        <Card header={
                        <div className="feria-rubrica-card__header">
                            <h4>{`${rubrica.nombreRubrica} - Ponderación: ${rubrica.ponderacion} - Exposicion: ${rubrica.exposicion ? 'Si' : 'No'}`}</h4>
                            <ImageButton
                                alt="Eliminar Rúbrica"
                                callback={handleBorrarRubrica} 
                                src={require("../../../../assets/cancel.png")}
                                small={true}
                            />
                        </div>} >
            
            <div className="feria-rubrica-card__table-container">
                <Table
                    modal={handleOpciones}
                    modalTitle="Opciones"
                    callback={handleBorrarCriterio}
                    headers={headers}
                    data={rubrica.criterios}
                />
            </div>

            {rubrica.criterios?.length >= 1 && ponderacionesCriterios !== 100 ? 
            <p className="feria-rubrica-card__error">La suma de la ponderación de los criterios debe dar 100</p> : null}


            <div className="feria-rubrica-card__nuevo-container">
                <NuevoCriterio rubrica={rubrica} />
            </div>
            
        </Card>
    )
}

export default FeriaRubricaCard