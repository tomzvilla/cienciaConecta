// components
import FeriaCard from "../../components/FeriaCard/FeriaCard"
import Spinner from "../../components/Spinner/Spinner"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useNavigate, useLocation } from "react-router-dom"
import Swal from "sweetalert2"

const VisualizarFeriaActual = () => {

    const axiosPrivate = useAxiosPrivate()
    const { data } = useAxiosFetch('/feria/activa', axiosPrivate)
    if(data) console.log(data)
    const location = useLocation()
    const navigate = useNavigate()
    const from = location?.state?.from || '/dashboard'

    const handleDelete = () => {
        Swal.fire({
            title: '¿Deseas cancelar la feria actual?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Borrar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Regresar',
            cancelButtonColor: '#D4272D',
        }).then( (result) => {
            if(result.isConfirmed) Swal.fire({
                title: '¿Estas seguro?',
                text: 'La cancelación no podrá deshacerse. Ingresá el nombre de la feria para confirmar.',
                icon: 'warning',
                input: 'text',
                showCancelButton: true,
                reverseButtons: true,
                showLoaderOnConfirm: true,
                confirmButtonText: 'Confirmar',
                confirmButtonColor: '#00ACE6',
                cancelButtonText: 'Regresar',
                cancelButtonColor: '#D4272D',
                preConfirm: (feriaInput) => {
                    try {
                        if(feriaInput !== data?.feriaActiva?.nombre){
                            throw new Error('ERROR, el nombre de la feria no coincide')
                        }

                    } catch(err) {
                        Swal.showValidationMessage(
                            'Error el nombre de la feria no coincide'
                        )
                    }
                },
            }).then(async (result) => {
                if(result.isConfirmed) {
                    const success = await deleteFeria()
                    if(success) Swal.fire({
                        title: 'Cancelaste la feria actual',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    }).then((result) => {
                        if(result.isConfirmed || result.isDismissed) {
                            navigate(from, {replace: true, state: {from:`${location.pathname}`}})
                        }
                    })
                }
            })
        })

        
    }
    
    const deleteFeria = async () => {
        try {
            await axiosPrivate.delete(`/feria/${data?.feriaActiva?._id}`,
                {
                    withCredentials: true
                }
            )
            return true
        } catch (err) {
            let msg = ''
            if(!err?.response){
                msg = 'El servidor no respondió'
            } else if(err.response?.status === 401) {
                msg = 'No estas autorizado para borrar la feria, tenés que ser administrador.'
            } else {
                msg = `Falló la cancelación de la Feria <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la cancelación',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }

    }

    return (
        !data ? (<Spinner />) : (<FeriaCard handleDelete={handleDelete} formData={data?.feriaActiva} />)
    )
}

export default VisualizarFeriaActual