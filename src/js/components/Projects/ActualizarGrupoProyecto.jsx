// components
import InputField from "../InputField/InputField"

const ActualizarGrupoProyecto = ({ data, handleAdd, handleDelete}) => {

    return (
        <div>
            <table className="table">
                <thead className="headBg">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">DNI</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                    return (
                        <tr key={index}>
                        <td key={index}>${item.nombre} </td> 
                        <td key={index}>${item.apellido} </td> 
                        <td key={index}>${item.dni} </td> 
                        <td key={index}>
                            <button onClick={handleDelete}>
                                Borrar
                            </button>
                        </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            <div>
                
            </div>
        </div>
    )
}

export default ActualizarGrupoProyecto