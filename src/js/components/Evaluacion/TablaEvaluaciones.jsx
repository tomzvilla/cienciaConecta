// components
import Badge from "../Badge/Badge";
import ImageLink from "../ImageLink/ImageLink";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"


const TablaEvaluaciones = (props) => {

    const listadoEvaluaciones = useSelector(state => state.evaluacion.listadoEvaluaciones)
    const navigate = useNavigate()

    const handleVolver = () => {
        const from = props.location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:'/evaluar'}})
    }

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
                        <th scope="col" className="table-header__head">Confirmadas</th>
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
                                                 <Badge key={proyecto.categoria._id} type={proyecto.categoria} />
                                            </td>
                                        )
                                    
                                    } 
                                    if(header.name === 'Nivel'){
                                        return (
                                            <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                 <Badge key={proyecto.nivel?._id} type={proyecto.nivel} />
                                            </td>
                                        )
                                    }
                                    else return (
                                    <td key={header.name} className="table-body-row__td" >{proyecto[`${header?.value}`]}</td>
                                )})}
                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageLink small={true} src={require("../../../assets/pantalla.png")} linkto={`/evaluar/${proyecto._id}`} alt="Evaluar"/>
                                </td>
                                {proyecto.estado < 3 ?
                                    <td className="table-body-row__td">
                                    {!proyecto.evaluacion ? `0/${proyecto.evaluadoresRegionales.length}` : `${proyecto.evaluacion.listo.length}/${proyecto.evaluadoresRegionales.length}`}
                                    </td>
                                :
                                    <td className="table-body-row__td">
                                        {!proyecto.exposicion ? `0/${proyecto.evaluadoresRegionales.length}` : `${proyecto.exposicion.listo.length}/${proyecto.evaluadoresRegionales.length}`}
                                    </td> 
                                }
                            </ tr>
                        )
                        
                    })}
                </tbody>
            </table>
        </>
    )
}

export default TablaEvaluaciones