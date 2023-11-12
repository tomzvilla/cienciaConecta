// components
import { useDispatch } from "react-redux";
import BlankState from "../../components/BlankState/BlankState";
import Card from "../../components/Card/Card";
import Spinner from "../../components/Spinner/Spinner";
import TablaActivacion from "../../components/Usuarios/TablaActivacion";
import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useLocation } from "react-router-dom";
import { pendientesActions } from "../../../store/pendiente-slice";


const headers = [
    {name: 'Nombre', value: 'nombre'},
    {name: 'CUIL', value: 'cuil'},
] 

 const VisualizarListadoPendienteActivacion = (props) => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const location = useLocation()
    const { data: usuarios, isLoading } = useAxiosFetch(`/auth/pendientes`, axiosPrivate)

    let usuariosPendientes = []
    

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
        usuariosPendientes = usuarios?.usuarios?.map(element => {
            element.nombre = element.datos_docente.nombre + " " + element.datos_docente.apellido 
            element.cuil = formatCuil(element.cuil)
            return {...element}
        });
        
        dispatch(pendientesActions.cargarUsuariosPendientes(usuariosPendientes))
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
                        <TablaActivacion location={location} headers={headers} />
                    }
            </Card>
        </div>
    );
 }

 export default VisualizarListadoPendienteActivacion;