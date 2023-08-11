const SeleccionSedes = (props) => {
    return (
        <>
        <h2>Sedes seleccionadas</h2>

            {props.establecimientos.length === 0 ? (<p> No hay sedes cargadas </p>) : (<div>
                <table className="table">
                    <thead className="headBg">
                        <tr>
                            <th scope="col">Establecimiento</th>
                            <th scope="col">CUE</th>
                            <th scope="col">Cupos</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        
                        {props.establecimientos && props.establecimientos.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.nombre} </td> 
                                <td>{item.cue} </td> 
                                <td> 
                                    <button onClick={(e) => props.handleCupos(e, item.nombre)}>
                                        Cupos
                                    </button>
                                </td> 
                                <td>
                                    <button onClick={(e) => props.handleDelete(e, item.nombre)}>
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        )
                        })}
                    </tbody>
                </table>
            </div>)}


        </>
    )
}


export default SeleccionSedes;