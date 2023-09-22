
import { useSelector } from "react-redux";


const TablaEvaluaciones = (props) => {

    const listadoEvaluaciones = useSelector(state => state.evaluaciones.listadoEvaluaciones) 


    return(
        <>
            <table className="table">
                <thead className="table__header">
                    <tr className="table-header">
                        <th scope="col" className="table-header__head">Título</th>
                        <th scope="col" className="table-header__head">Nivel</th>
                        <th scope="col" className="table-header__head">Categoría</th>
                        <th scope="col" className="table-header__head">Estado</th>
                        <th scope="col" className="table-header__head">Acciones</th>
                        <th scope="col" className="table-header__head">Evaluaciones Confirmadas</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {listadoEvaluaciones.map((proyecto, index) => {
                        return (
                            <tr key={proyecto._id} className="table-body-row">
                                {props.headers.map(header => {
                                    if(header.name === 'Categoría'){
                                        return (
                                            <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                {postulacion.categorias.map( c => (<Badge key={c._id} type={c} />)
                                                )}
                                            </td>
                                        )
                                    
                                    } 
                                    if(header.name === 'Niveles'){
                                        return (
                                            <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                {postulacion.niveles.map( n => (<Badge  key={n._id} type={n} />)
                                                )}
                                            </td>
                                        )
                                    }
                                    else return (
                                    <td key={header.name} className="table-body-row__td" >{postulacion[`${header?.value}`]}</td>
                                )})}
                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageButton callback={() => {}} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                </td>
                                <td className="table-body-row__td">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleRowSelection(postulacion._id)}
                                    />
                                </td>   
                            </ tr>
                        )
                        
                    })}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalCount={postulaciones.length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />
            <div>
                <Button 
                    text='Volver' 
                    onClickHandler={handleVolver}
                />
                <Button 
                    text='Seleccionar' 
                    onClickHandler={handleSeleccion}
                    activo={true}
                />
            </div>
        </>
    )
}

export default TablaEvaluaciones