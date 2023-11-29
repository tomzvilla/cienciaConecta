// components
import ImageLink from "../ImageLink/ImageLink"
import ImageButton from "../ImageButton/ImageButton"
import Pagination from "../Pagination/Pagination"
import Card from "../Card/Card"
// hooks
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

import Swal from "sweetalert2"
import { ESTADOS } from "../../../App"

const pageSize = 5

const headers = [
    {name: 'Nombre', value: 'nombre'},
    {name: 'Descripcion', value: 'descripcion'},
    {name: 'Estado', value: 'nombreEstado' }
]
  
const ListadoFerias = (props) => {

    const navigate = useNavigate()

    // state with redux
    const ferias = useSelector(state => state.feria.listadoFerias) || []
    console.log(ferias)

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [resize, setResize] = useState(window.innerWidth <= 800);

    const calculateCurrentTableData = () => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return ferias?.slice(firstPageIndex, lastPageIndex);
    };
      
    const currentTableData = calculateCurrentTableData();

    const handleVolver = () => {
        const from = props.location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:'/seleccionarPostulantes'}})
    }

    const showAlert = () => {
        Swal.fire({
            title: 'Oops!',
            text: 'No puedes editar una feria finalizada',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#00ACE6',
        })
    }

    const handleResize = () => {
        setResize(window.innerWidth <= 800);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <Card title={'Listado de ferias'}>
            <table className="table">
                <thead className="table__header">

                {!resize ? 
                    <tr>
                        {headers.map(header => {
                            return (
                                <th scope="col" key={header.value} className="table-header__head">{header.name}</th>
                                )
                            })
                        }
                        <th scope="col" className="table-header__head">Acciones</th>
                    </tr>
                        :
                    <tr>
                        <th scope="col" key={headers[0].value} className="table-header__head">{headers[0].name}</th>
                        <th scope="col" className="table-header__head">Acciones</th>
                    </tr>
                    }

                </thead>

                <tbody className="table__body">
                    {ferias && currentTableData.map((feria) => {
                        const feriaActual = feria.estado !== ESTADOS.finalizada
                        console.log(feriaActual)
                        return (
                            !resize ? 
                            <tr key={feria._id} className="table-body-row">
                                {headers.map(header => {
                                    return (
                                    <td key={header.name} className="table-body-row__td" >{feria[`${header?.value}`]}</td>
                                )})}
                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageLink linkto={feriaActual ? `/verFeria` : `/feria/${feria._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                    {feriaActual ?
                                    <ImageLink small={true} alt="Editar" linkto={`/editarFeria`} src={require("../../../assets/edit.png")}/>
                                    :
                                    <ImageButton small={true} alt="Editar" callback={showAlert} src={require("../../../assets/edit.png")}/>
                                    }
                                </td>  
                            </ tr>

                            :

                            <tr key={feria._id} className="table-body-row">
                                <td key={headers[0].name} className="table-body-row__td" >{feria[`${headers[0]?.value}`]}</td>
                                <td className="table-body-row__td table-body-row__td--actions">
                                    <ImageLink linkto={feriaActual ? `/verFeria` : `/feria/${feria._id}`} small={true} alt="Ver" src={require("../../../assets/ver.png")}/>
                                    {feriaActual ?
                                    <ImageLink small={true} alt="Editar" linkto={`/editarFeria`} src={require("../../../assets/edit.png")}/>
                                    :
                                    <ImageButton small={true} alt="Editar" callback={showAlert} src={require("../../../assets/edit.png")}/>
                                    }
                                </td>  
                            </ tr>
                        )  
                    }
                    )}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalCount={ferias?.length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />
        </Card>
    )

}

export default ListadoFerias