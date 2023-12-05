// components
import ImageButton from "../ImageButton/ImageButton";
import Pagination from "../Pagination/Pagination";
import Button from "../Button/Button";
// hooks
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { reportesActions } from "../../../store/reportes-slice";
const pageSize = 10

const TablaReportes = (props) => {
    // referentes state
    const listadoReportes = useSelector(state => state.reportes.listadoReportes)
    const dispatch = useDispatch()

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    
    const calculateCurrentTableData = () => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return listadoReportes?.slice(firstPageIndex, lastPageIndex);
    };
      
    const currentTableData = calculateCurrentTableData();

    const borrarReporte = (titulo) => {
        dispatch(reportesActions.borrarReporte(titulo))
    }


    return (
        <>
            <table className="table">
                <thead className="table__header">
                    <tr>
                        <th scope="col" className="table-header__head">Reportes</th>
                        <th className="table-header__head">Acciones</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {listadoReportes && currentTableData.map((reporte, index) => 
                            <tr key={index} className="table-body-row">
                                <td className="table-body-row__td" >{reporte.titulo}</td>
                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageButton callback={() => props.handleRemoveReport(reporte.titulo, index)} small={true} alt="Borrar" src={require("../../../assets/x.png")}/>
                                </td>
                            </ tr>
                    )}
                </tbody>
            </table>
            {<Pagination currentPage={currentPage} totalCount={listadoReportes.length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />}
            <div className='button-container'>
                <Button text='Imprimir' onClickHandler={props.imprimirPdf} activo={true}/>
            </div>

        </>
    )
}

export default TablaReportes