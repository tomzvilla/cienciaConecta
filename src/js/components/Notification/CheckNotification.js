import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { toast } from "sonner";

const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };

const CheckNotification = () => {

    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()

    useEffect(() => {

        const fetchNotification = async () => {
            try {
                const response = await axiosPrivate.get('/notificaciones/new')
                if(!response.data || response.status !== 200) return
                response.data.forEach( notification => {
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