import { useDispatch } from "react-redux";
import BlankState from "../../components/BlankState/BlankState";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import TablaActivacion from "../../components/Usuarios/TablaActivacion";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";
import { pendientesActions } from "../../../store/pendiente-slice";
import Swal from "sweetalert2";
import { useState } from "react";

const headers = [
    {name: 'Nombre', value: 'nombre'},
    {name: 'CUIL', value: 'cuil'},
] 

 const VisualizarListadoPendienteActivacion = (props) => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { data: usuarios, isLoading } = useAxiosFetch(`/auth/pendientes`, axiosPrivate)
    const [selectedRows, setSelectedRows] = useState([])
    

    const formatCuil = (input) => {
        // Eliminar todos los caracteres no numéricos
        const numericInput = input.replace(/\D/g, '');
    
        // Aplicar el formato con guiones
        if (numericInput.length <= 2) {
          return numericInput;
        } else if (numericInput.length <= 10) {
          return `${numericInput.slice(0, 2)}-${numericInput.slice(2)}`;
        } else {
          return `${numericInput.slice(0, 2)}-${numericInput.slice(2, 10)}-${numericInput.slice(10, 11)}`;
        }
      };

    if (!isLoading && usuarios) {

        const updatedElements = usuarios.usuarios.map(element => {
            element.nombre = element.datos_docente.nombre + " " + element.datos_docente.apellido 
            element.cuil = formatCuil(element.cuil)
            return {...element}
          });
        
        dispatch(pendientesActions.cargarUsuariosPendientes(updatedElements))
    }

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

    return (
        <div className="table-custom-page">
            <Card title="Listado de usuarios pendientes de activación" wide={true}>
                    {isLoading && !usuarios ? 
                        <Spinner /> 
                        :
                        usuarios?.length === 0 ?
                        < BlankState msg='No hay usuarios pendientes de activación. ¡Intentá de nuevo mas tarde!' />
                        :
                        <TablaActivacion location={location} headers={headers} data={usuarios.usuarios} 
                        handleSeleccion={handleSeleccion} selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
                    }
            </Card>
        </div>
    );
 }

 export default VisualizarListadoPendienteActivacion;