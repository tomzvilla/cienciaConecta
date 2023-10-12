// components
import ImageButton from "../ImageButton/ImageButton"

// hooks
import useUtils from "../../hooks/useUtils"
const headers = [
    {name: 'Nombre', value: 'nombre'},
    {name: 'CUIL', value: 'cuil'},
]

const TablaEvaluadoresAsignados = (props) => {

    const { formatCuil } = useUtils()
    console.log(props.evaluadoresAsignados)

    const handleBorrar = () => {}

    return (
        
        <table className="table">
            <thead className="table__header">
                <tr>
                    {headers.map(header => {
                        return (
                            <th scope="col" key={header.value} className="table-header__head">{header.name}</th>
                            )
                        })
                    }
                    <th scope="col" className="table-header__head">Acciones</th>
                </tr>
            </thead>
            <tbody className="table__body">
                {props.evaluadoresAsignados.map((evaluador) => {
                    return (
                        <tr key={evaluador._id} className="table-body-row">
                            {headers.map(header => {                
                                if(header.name === 'Nombre'){
                                    return (
                                        <td key={header.name} className="table-body-row__td" >{`${evaluador.datos_docente.nombre} ${evaluador.datos_docente.apellido}`}</td>
                                    )
                                }
                                else if(header.name === 'CUIL') {
                                    return (<td key={header.name} className="table-body-row__td" >{formatCuil(evaluador.datos_docente[`${header?.value}`])}</td>)
                                }
                                else return (
                                    <td key={header.name} className="table-body-row__td" >{evaluador.datos_docente[`${header?.value}`]}</td>
                            )})}
                            <td className="table-body-row__td table-body-row__td--actions">
                                <ImageButton small={true} src={require("../../../assets/x.png")} callback={() => handleBorrar(evaluador._id)} text="Borrar"/>
                            </td>
  
                        </ tr>
                    )
                    
                }
                )}
            </tbody>
        </table>
    )
}

export default TablaEvaluadoresAsignados