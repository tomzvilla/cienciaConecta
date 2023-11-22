// components
import ImageLink from "../ImageLink/ImageLink"
import Badge from "../Badge/Badge"
import Pagination from "../Pagination/Pagination"
// hooks
import { useEffect, useMemo, useState } from "react"
import { useSelector } from "react-redux"

const pageSize = 10

const TablaProyectosReferente = (props) => {
    const [resize, setResize] = useState(window.innerWidth <= 1200);

    // state with redux
    const proyectosReferente = useSelector(state => state.referentes.proyectosReferente)

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return proyectosReferente.slice(firstPageIndex, lastPageIndex);
    }, [currentPage]);

        const handleResize = () => {
          setResize(window.innerWidth <= 1200);
        };
      
        useEffect(() => {
          window.addEventListener('resize', handleResize);

          return () => {
            window.removeEventListener('resize', handleResize);
          };
        }, []);


    return (
        <>
            <table className="table">
                <thead className="table__header">
                    {!resize ? 
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
                    
                    : 

                    <tr>
                        <th scope="col" className="table-header__head">{props.headers[0].name}</th>
                        <th scope="col" className="table-header__head">Acciones</th>
                    </tr> 
                    
                    }
                    
                        
                </thead>
                <tbody className="table__body">
                    {proyectosReferente && currentTableData.map((proyecto) => 

                        (!resize ?
                        
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
                        
                        :

                            <tr key={proyecto._id} className="table-body-row">
                                <td key={props.headers[0].name} className="table-body-row__td" >{proyecto[props.headers[0]?.value]}</td>

                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageLink linkto={`asignar/${proyecto._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/> 
                                </td>
                            </tr>

                        )
                        
                    
                    )}
                </tbody>
            </table>

            <Pagination currentPage={currentPage} totalCount={proyectosReferente.length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />
        </>
    )

}

export default TablaProyectosReferente