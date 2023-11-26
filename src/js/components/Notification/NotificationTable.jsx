// components
import Button from "../Button/Button"
import Pagination from "../Pagination/Pagination"
import ImageButton from "../ImageButton/ImageButton"
import BlankState from "../BlankState/BlankState"
// hooks
import { useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useSelector, useDispatch } from "react-redux"
import { notificacionesActions } from "../../../store/notificaciones-slice"

const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

const pageSize = 10

const NotificationTable = (props) => {

    const axiosPrivate = useAxiosPrivate()

    // state with redux
    const notificaciones = useSelector(state => state.notificaciones.notificaciones) || []
    const dispatch = useDispatch()

    // pagination state
    const [currentPage, setCurrentPage] = useState(1);

    const calculateCurrentTableData = () => {
        const firstPageIndex = (currentPage - 1) * pageSize;
        const lastPageIndex = firstPageIndex + pageSize;
        return notificaciones?.slice(firstPageIndex, lastPageIndex);
    };
      
    const currentTableData = calculateCurrentTableData();

    const readNotification = async (idNotificacion) => {

        dispatch(notificacionesActions.marcarComoLeidas([idNotificacion]))

        try {
            const response = await axiosPrivate.post('/notificaciones', JSON.stringify({
                leidas: [idNotificacion]
            }))

            if(response.status === 200) {
                dispatch(notificacionesActions.marcarComoLeidas([idNotificacion]))
            } else {
                dispatch(notificacionesActions.marcarComoNoLeidas([idNotificacion]))
            }
            
        } catch (err) {
            console.log(err)
            dispatch(notificacionesActions.marcarComoNoLeidas([idNotificacion]))
        }

    }

    const readAllNotifications = async () => {

        const newNotifications = notificaciones.filter(n => parseInt(n.estado) !== 2).map(n => n._id)

        dispatch(notificacionesActions.marcarComoLeidas(newNotifications))

        try {
            const response = await axiosPrivate.post('/notificaciones', JSON.stringify({
                leidas: newNotifications
            }))

            if(response.status === 200) {
                dispatch(notificacionesActions.marcarComoLeidas(newNotifications))
            } else {
                dispatch(notificacionesActions.marcarComoNoLeidas(newNotifications))
            }

        } catch (err) {
            console.log(err)
            dispatch(notificacionesActions.marcarComoNoLeidas(newNotifications))
        }

    }

    return (
        <>
            {notificaciones.length > 0 ?
            <>
                <table className="table">
                    <thead className="table__header">
                        <tr>
                            <th scope="col" className="table-header__head">Notificación</th>
                            <th scope="col" className="table-header__head">Marcar como leída</th>
                        </tr>
                    </thead>
                    <tbody className="table__body">
                        {notificaciones && currentTableData.map(notificacion => {
                            const formatoFecha = new Date(notificacion.timestamp).toLocaleDateString('es-AR', opciones)
                            return (
                                <tr key={notificacion._id} className="table-body-row">
                                    <td style={parseInt(notificacion.estado) === 2 ? {color: 'red'} : {color: 'grey'}}>
                                        {notificacion.mensaje}
                                        <br />
                                        {formatoFecha}
                                    </td>
                                    <td className="table-body-row__td">
                                        <ImageButton small={true} src={require("../../../assets/verificado.png")} callback={() => readNotification(notificacion._id)} text="Marcar como leída"/>
                                    </td>   
                                </ tr>
                            )
                            
                        }
                        )}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} totalCount={notificaciones?.length} pageSize={pageSize} onPageChange={page => setCurrentPage(page)} />
                    <div className="button-container">
                        <Button 
                            text='Marcar todas como leídas' 
                            onClickHandler={readAllNotifications}
                            activo={true}
                        />
                    </div>
            </>
            :
            <BlankState msg={'No posees notificaciones.'}/>
            }

        </>
    )

}

export default NotificationTable