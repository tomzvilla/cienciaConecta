// components
import ImageLink from "../ImageLink/ImageLink"
import ImageButton from '../ImageButton/ImageButton'
import Pagination from "../Pagination/Pagination"
// hooks
import { useState } from "react"
import { ESTADOS } from "../../../App"
import { useSelector } from "react-redux"

import Swal from "sweetalert2"

const pageSize = 10

const TablaProyectos = ({ headers, proyectos, resize}) => {
    console.log(proyectos)

    const feria = useSelector(state => state.instancias.feria)

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);

    const calculateCurrentTableData = () => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return proyectos?.slice(firstPageIndex, lastPageIndex);
    };
      
    const currentTableData = calculateCurrentTableData();

    const showAlert = () => {
        Swal.fire({
            title: 'Oops!',
            icon: 'warning',
            text: 'No puedes editar un proyecto que ya finalizó o si ya finalizó la instancia escolar',
            confirmButtonText: 'OK',
            confirmButtonColor: '#00ACE6',
        })
    }

    return (
        <>
            <table className="table">
                <thead className="table__header">
                    <tr>
                        {headers.map(header => {
                            return (
                                <th scope="col" key={header.value} className="table-header__head">{header.name}</th>
                                )
                            })
                        }
                        <th scope="col" className="table-header__head">Acciones</th>
                    </tr>
                </thead>
                <tbody className="table__body">
                    {proyectos && currentTableData.map(proyecto => {
                        return (
                            !resize ? 
                            <tr key={proyecto._id} className="table-body-row">
                                {headers.map(header => {
                                    console.log(header)
                                    return <td key={header.name} className="table-body-row__td" >{proyecto[`${header?.value}`]}</td>
                                })}
                                <td className="table-body-row__td table-body-row__td--actions">
                                {
                                    parseInt(proyecto.estado) !== 8 ?
                                    <ImageLink linkto={`/proyecto/${proyecto._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                    :
                                    <ImageLink linkto={`/proyecto/antiguo/${proyecto._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                }
                                {
                                    [ ESTADOS.iniciada, ESTADOS.instanciaEscolar, ESTADOS.instanciaEscolar_Finalizada ].includes(feria?.estado) && parseInt(proyecto.estado) !== 8 ?
                                    <ImageLink linkto={`/editarProyecto/${proyecto._id}`} small={true} alt="Editar" src={require("../../../assets/edit.png")}/>
                                    :
                                    <ImageButton small={true} callback={showAlert} alt="Editar" src={require("../../../assets/edit.png")}/>
                                }
                                </td>

                            </ tr>
                            :
                            <tr key={proyecto._id} className="table-body-row">

                                <td key={headers[0].name} className="table-body-row__td" >{proyecto[`${headers[0]?.value}`] + " " + proyecto[`${headers[1]?.value}`]}</td>

                                {
                                    parseInt(proyecto.estado) !== 8 ?
                                    <td className="table-body-row__td">
                                        <ImageLink linkto={`/proyecto/${proyecto._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                    </td>
                                    :
                                    <td className="table-body-row__td">
                                        <ImageLink linkto={`/proyecto/antiguo/${proyecto._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                    </td>
                                }
                            </ tr>
                        )
                    }
                    )}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalCount={proyectos?.length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />
        </>
    )

}

export default TablaProyectos