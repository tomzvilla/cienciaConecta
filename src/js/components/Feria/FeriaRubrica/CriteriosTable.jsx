const CriteriosTable = (props) => {

    const { rubrica, handleDeleteCriterio, abrirOpciones } = props

    return (
        rubrica?.criterios?.length === 0 ? 
        (   
            <p> No hay criterios cargados para esta rubrica</p>
        ) 
        :
        (
            
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
                                    <button onClick={(e) => abrirOpciones(e, rubrica, c)}>
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

}

export default CriteriosTable