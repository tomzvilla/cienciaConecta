// components
import ImageLink from "../ImageLink/ImageLink"
import Badge from "../Badge/Badge"
import Pagination from "../Pagination/Pagination"
// hooks
import { useMemo, useState } from "react"
import { useSelector } from "react-redux"

const pageSize = 10

const TablaProyectosReferente = (props) => {

    // state with redux
    const proyectosReferente = useSelector(state => state.referentes.proyectosReferente)

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return proyectosReferente.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);


    return (
        <>
            <table className="table">
                <thead className="table__header">
                    <tr>
                        {props.headers.map(header => {
                            return (
                                <th scope="col" key={header.value} className="table-header__head">{header.name}</th>
                                )
                            })
                        }
                        <th scope="col" className="table-header__head">Evaluadores Asignados</th>
                        <th scope="col" className="table-header__head">Acciones</th>
                    </tr>
                        
                </thead>
                <tbody className="table__body">
                    {proyectosReferente && currentTableData.map((proyecto) => {
                        return (
                            <tr key={proyecto._id} className="table-body-row">
                                {props.headers.map(header => {
                                    if(header.name === 'Categoría'){
                                        return (
                                            <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                <Badge type={proyecto.categoria} />
                                            </td>
                                        )
                                    } 
                                    else if(header.name === 'Nivel'){
                                        return (
                                            <td key={header.name} className="table-body-row__td table-body-row__td--badges">
                                                <Badge type={proyecto.nivel} />
                                            </td>
                                        )
                                    } 
                                    else return (
                                    <td key={header.name} className="table-body-row__td" >{proyecto[header?.value]}</td>
                                )})}
                                <td className="table-body-row__td">
                                    <p>{proyecto.evaluadoresRegionales.length}</p>
                                </td>
                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageLink linkto={`asignar/${proyecto._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/> 
                                </td>
                            </ tr>
                        )
                        
                    }
                    )}
                </tbody>
            </table>

            <Pagination currentPage={currentPage} totalCount={proyectosReferente.length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />
        </>
    )

}

export default TablaProyectosReferente