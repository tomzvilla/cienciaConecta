// components
import AddOpcion from "./AddOpcion"
import Table from "../../Table/Table"

// hooks
import { useSelector, useDispatch } from "react-redux"
import { feriaActions } from "../../../../store/feria-slice"
const headers = [
    {name: 'Opción', value: 'nombre'},
    {name: 'Puntaje', value: 'puntaje'},
]

const OpcionesModal = (props) => {

    const { rubrica, criterio } = props 
    const listadoOpciones = useSelector(state => state.feria.rubricas).find(r => r.nombreRubrica === props.rubrica.nombreRubrica)?.criterios?.find(c => c.nombre === props.criterio.nombre)?.opciones
    const dispatch = useDispatch()
    const handleDeleteOpcion = (e, opcion) => {
        e.preventDefault()
        dispatch(feriaActions.borrarOpcion({
            rubrica: props.rubrica,
            criterio: props.criterio,
            opcion,
        }))
    }

    return (
        <div>
            <Table
                callback={handleDeleteOpcion}
                headers={headers}
                data={listadoOpciones}
            />
            <AddOpcion criterio={criterio} rubrica={rubrica} />
        </div>
    )

}

export default OpcionesModal