// components
import ImageLink from "../ImageLink/ImageLink"
import ImageButton from "../ImageButton/ImageButton"
import Badge from "../Badge/Badge"
const TablaPostulantes = (props) => {
    return(
        <table className="table">
            <thead className="table__header">
                <tr className="table-header">
                    <th scope="col" className="table-header__head">Nombre</th>
                    <th scope="col" className="table-header__head">Apellido</th>
                    <th scope="col" className="table-header__head">CUIL</th>
                    <th scope="col" className="table-header__head">Niveles</th>
                    <th scope="col" className="table-header__head">Categorías</th>
                    <th scope="col" className="table-header__head">Acciones</th>
                    <th scope="col" className="table-header__head">Seleccionar</th>
                </tr>
            </thead>
            <tbody className="table__body">
                {props.data && props.data.map((postulacion, index) => {
                    return (
                        <tr key={index} className="table-body-row">
                            {props.headers.map(header => {
                                if(header.name === 'Categorías'){
                                    return (
                                        <td className="table-body-row__td table-body-row__td--badges">
                                            {postulacion.categorias.map( c => (<Badge type={c} />)
                                            )}
                                        </td>
                                    )
                                } else return (
                                <td key={index} className="table-body-row__td" >{postulacion[`${header?.value}`]}</td>
                                )})}
                            <td key={index} className="table-body-row__td table-body-row__td--actions">
                                <ImageLink small={true} alt="Ver" linkto={`${props.viewPath}/${postulacion._id}`} src={require("../../../assets/ver.png")}/>
                            </td>
                            <td key={index} className="table-body-row__td">
                                <ImageButton small={true} alt="Seleccionar" linkto={""} callback={(e) => props.callback(e, postulacion)} src={require("../../../assets/x.png")}/>
                            </td>    
                        </ tr>
                    )
                    
                })}
            </tbody>
        </table>
    )

}

export default TablaPostulantes