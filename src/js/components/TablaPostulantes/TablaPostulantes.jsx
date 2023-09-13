// components
import ImageLink from "../ImageLink/ImageLink"
import Button from "../Button/Button"
import Badge from "../Badge/Badge"

// hooks
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const TablaPostulantes = (props) => {

    const [selectedRows, setSelectedRows] = useState([])
    const navigate = useNavigate()

    const toggleRowSelection = (postulanteId) => {
        if (selectedRows.includes(postulanteId)) {
          setSelectedRows(selectedRows.filter((id) => id !== postulanteId));
        } else {
          setSelectedRows([...selectedRows, postulanteId]);
        }
    }

    const handleSeleccion = () => {
        console.log(selectedRows)
    }

    const handleVolver = () => {
        const from = props.location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:'/seleccionarPostulantes'}})
    }


    return(
        <>
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
                        const isChecked = selectedRows.includes(postulacion._id);
                        return (
                            <tr key={postulacion._id} className="table-body-row">
                                {props.headers.map(header => {
                                    if(header.name === 'Categorías'){
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
                                    <ImageLink small={true} alt="Ver" linkto={`${props.viewPath}/${postulacion._id}`} src={require("../../../assets/ver.png")}/>
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

export default TablaPostulantes