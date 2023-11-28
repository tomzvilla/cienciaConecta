// components
import Card from "../Card/Card"
import Spinner from "../Spinner/Spinner"
import NotificationTable from "./NotificationTable"
// hooks
import { useEffect, useState } from "react"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useDispatch } from "react-redux"
import { notificacionesActions } from "../../../store/notificaciones-slice"


const NotificationList = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const { data, isLoading } = useAxiosFetch('/notificaciones', axiosPrivate)
    const [loadingNotification, setIsLoadingNotificacion] = useState(true)

    useEffect(() => {
        if(!isLoading) {
            dispatch(notificacionesActions.cargarNotificaciones(data))
            setIsLoadingNotificacion(false)
        }

    })

    return (
        <Card title={'Notificaciones'}>
            {isLoading || loadingNotification ?
                <Spinner />
                :
                <NotificationTable />
            }
        </Card>
    )
}

export default NotificationList