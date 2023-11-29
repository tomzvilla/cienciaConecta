import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { notificacionesActions } from "../../../store/notificaciones-slice";

const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
const pathnames = ['/home', '/signup', '/login', '/confirmar', '/recuperarCredenciales', '/reestablecerCredenciales']

const CheckNotification = () => {

    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchNotification = async () => {
            try {
                if(pathnames.some(path => location.pathname.startsWith(path))) return
                const response = await axiosPrivate.get('/notificaciones/new')
                if(!response.data.notificacionesNuevas || response.status !== 200) return

                dispatch(notificacionesActions.cargarNumeroSinLeer(response.data.notificacionesNoLeidas))
                response.data.notificacionesNuevas.forEach( notification => {
                    const formatoFecha =
                        new Date(notification.timestamp).toLocaleDateString('es-AR', opciones)
        
                    toast(notification.mensaje, {
                        description: formatoFecha,
                    })
                })
            } catch (err) {
                console.log(err)
            }
        }
        fetchNotification()
        
    }, [location.pathname]);

  return null
}


export default CheckNotification