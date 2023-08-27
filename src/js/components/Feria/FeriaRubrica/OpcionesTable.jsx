
const OpcionesTable = (props) => {

    const { criterio, handleDeleteOpcion} = props

    return (
        criterio?.opciones?.length === 0 ? 
        (   
            <p> No hay opciones cargadas para esta criterio</p>
        ) 
        :
        (
            
            <table>
                <thead>
                    <tr>
                        <th>Opción</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {criterio.opciones.map((o, index) =>
                        (
                            <tr key={index}>
                                <td key={index}>{o} </td> 
                                <td key={index}>
                                    <button onClick={(e) => handleDeleteOpcion(e, o)}>
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            
        )
    )

}

export default OpcionesTable