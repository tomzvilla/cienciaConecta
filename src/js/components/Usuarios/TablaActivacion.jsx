// components
import ImageLink from "../ImageLink/ImageLink";
import Button from "../Button/Button";
import Pagination from "../Pagination/Pagination";
import BlankState from "../BlankState/BlankState";
// hooks
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import { pendientesActions } from "../../../store/pendiente-slice";

const pageSize = 5

const TablaActivacion = (props) => {

    //const listadoEvaluaciones = useSelector(state => state.evaluacion.listadoEvaluaciones)
    const pendientes = useSelector(state => state.pendientes.listadoPendientes)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const axiosPrivate = useAxiosPrivate()
    const [selectedRows, setSelectedRows] = useState([])

    const handleVolver = () => {
        const from = props.location.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:'/evaluar'}})
    }

    const toggleRowSelection = (usuarioId) => {
        if (selectedRows.includes(usuarioId)) {
          setSelectedRows(selectedRows.filter((id) => id !== usuarioId));
        } else {
          setSelectedRows([...selectedRows, usuarioId]);
        }
    }

    const [currentPage, setCurrentPage] = useState(1);

    const calculateCurrentTableData = () => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return pendientes.slice(firstPageIndex, lastPageIndex);
    };
      
    const currentTableData = calculateCurrentTableData();

    const seleccionarPendientes = async () => {
        try {
            const response = await axiosPrivate.post(`/auth/alta`,

                JSON.stringify({usuarios: selectedRows}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
            if(response.status === 200) return true

        } catch (err) {
            console.log(err)
            let msg = ''
            if(!err?.response){
                msg = 'El servidor no respondió'
            } else if(err.response?.status === 403) {
                msg = 'El usuario ya esta activado'
            } else if(err.response?.status === 401) {
                msg = 'No existe el usuario.'
            } else {
                msg = `Falló la activacion de la cuenta <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la activacion de la cuenta',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }
    }


    const handleSeleccion = () => {
        if(selectedRows.length === 0) {
            Swal.fire({
                text: '¡No puede activar usuarios sin marcar ninguno!',
                title: 'Error al activar usuarios',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
            return
        }

        Swal.fire({
            title: '¿Deseas activar a los usuarios seleccionados?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await seleccionarPendientes()
                if(success) Swal.fire({
                    title: '¡Usuarios activados!',
                    text: 'Se enviará un email a los usuarios notificando sobre la activación de su cuenta',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
                        dispatch(pendientesActions.actualizarUsuariosPendientes(selectedRows))
                        setSelectedRows([])
                        
                    }
                })
            }
        })
    }

    return(
        pendientes.length !== 0 ?
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
                        const isChecked = selectedRows.includes(data._id);
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
                    onClickHandler={handleSeleccion}
                    activo={true}
                />
            </div>

            
        </>
        :
        < BlankState msg='No hay usuarios pendientes de activación. ¡Intentá de nuevo mas tarde!' />
    )
}

export default TablaActivacion