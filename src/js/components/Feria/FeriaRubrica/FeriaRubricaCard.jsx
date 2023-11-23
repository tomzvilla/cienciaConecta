// components
import ImageButton from "../../ImageButton/ImageButton"
import Table from "../../Table/Table"
import NuevoCriterio from "./NuevoCriterio"
import Card from "../../Card/Card"

// hooks
import { useDispatch } from "react-redux"
import { feriaActions } from "../../../../store/feria-slice"
import { useEffect, useState } from "react"

const FeriaRubricaCard = (props) => {

    const { rubrica, abrirOpciones } = props
    const [resize, setResize] = useState(window.innerWidth <= 800);
    const dispatch = useDispatch()

    const headers = !resize ? [
        {name: 'Criterios', value: 'nombre'},
        {name: 'Ponderación', value: 'ponderacion'},
    ] : [{name: 'Criterios - Pond.', value: 'nombrePonderacion'}]

    function addNombrePonderacion(rubrica) {
        return rubrica && rubrica.criterios
          ? { ...rubrica, criterios: rubrica.criterios.map(criterio => ({ ...criterio, nombrePonderacion: `${criterio.nombre} - ${criterio.ponderacion}` })) }
          : rubrica;
      }

    const updatedRubricas = addNombrePonderacion(rubrica);

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

    const handleResize = () => {
        setResize(window.innerWidth <= 800);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    return (
        <Card header={
                        <div className="feria-rubrica-card__header">
                            <h4>{`${rubrica.nombreRubrica} - Ponderación: ${rubrica.ponderacion} - Exposición: ${rubrica.exposicion ? 'Si' : 'No'}`}</h4>
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
                    data={!resize ? rubrica.criterios : updatedRubricas.criterios}
                />
            </div>

            {rubrica.criterios?.length >= 1 && ponderacionesCriterios !== 100 ? 
            <p className="feria-rubrica-card__error">La suma de la ponderación de los criterios debe dar 100</p> : null}


            <NuevoCriterio rubrica={rubrica} />
            
        </Card>
    )
}

export default FeriaRubricaCard