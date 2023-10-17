// components
import ImageLink from "../ImageLink/ImageLink";
import Button from "../Button/Button";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import Pagination from "../Pagination/Pagination";
import { useMemo, useState } from "react";

const pageSize = 5

const TablaActivacion = (props) => {

    //const listadoEvaluaciones = useSelector(state => state.evaluacion.listadoEvaluaciones)
    const pendientes = useSelector(state => state.pendientes.listadoPendientes)
    const navigate = useNavigate()

    const handleVolver = () => {
        const from = props.location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:'/evaluar'}})
    }

    const toggleRowSelection = (usuarioId) => {
        if (props.selectedRows.includes(usuarioId)) {
          props.setSelectedRows(props.selectedRows.filter((id) => id !== usuarioId));
        } else {
          props.setSelectedRows([...props.selectedRows, usuarioId]);
        }
    }


    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return pendientes.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);


    return(
        <>
            <table className="table">
                <thead className="table__header">
                    <tr className="table-header">
                        <th scope="col" className="table-header__head">Nombre</th>
                        <th scope="col" className="table-header__head">CUIL</th>
                        <th scope="col" className="table-header__head">Ver</th>
                        <th scope="col" className="table-header__head">Seleccionar</th>
                    </tr>
                </thead>

                <tbody className="table__body">
                    {pendientes && currentTableData.map((data, index) => {
                        const isChecked = props.selectedRows.includes(data._id);
                        return (
                            <tr key={data._id} className="table-body-row">
                                {props.headers.map(header => {
                                     return (
                                    <td key={header.name} className="table-body-row__td" >{data[`${header?.value}`]}</td>
                                )})}

                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageLink small={true} src={require("../../../assets/ver.png")} linkto={`/usuarioPendienteActivacion/${data._id}`} alt="Ver usuario"/>
                                </td>

                                <td className="table-body-row__td">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggleRowSelection(data._id)}
                                    />
                                </td>   
                            </ tr>
                        )
                        
                    })}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalCount={pendientes.length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />
            <div className="button-container">
                <Button 
                    text='Volver' 
                    onClickHandler={handleVolver}
                />
                <Button 
                    text='Seleccionar' 
                    onClickHandler={props.handleSeleccion}
                    activo={true}
                />
            </div>

            
        </>
    )
}

export default TablaActivacion