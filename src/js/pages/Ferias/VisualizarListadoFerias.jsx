// Components
import TableCard from "../../components/Table/TableCard"
import Spinner from "../../components/Spinner/Spinner"
import BlankState from "../../components/BlankState/BlankState"
import Card from "../../components/Card/Card"
import Metadata from "../../components/Metadata/Metadata"
import ListadoFerias from "../../components/Feria/ListadoFerias"
// Hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useDispatch } from "react-redux"
import { feriaActions } from "../../../store/feria-slice"
const estados = ["Inactiva", "Inicio", "Instancia escolar", "Instancia regional", "Evaluación regional", "Instancia provincial", "Evaluación provincial", "Finalización",]

const headers = [
  {name: 'Nombre', value: 'nombre'},
  {name: 'Descripcion', value: 'descripcion'},
//   {name: 'Proyectos Inscriptos', value: 'proyectosInscriptos'},
//   {name: 'Evaluador', value: 'evaluadores'},
//   {name: 'Fecha Próxima Instancia', value: 'proximaFecha'},
  {name: 'Estado', value: 'estado' }
]

const VisualizarListadoFerias = () => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const { data, isLoading } = useAxiosFetch('/feria', axiosPrivate)

    let ferias=[]


    if (data) {
        console.log(data)
        ferias = data.ferias.map((feria) => ({
            ...feria,
            estado: estados[feria.estado],
        }))

        dispatch(feriaActions.cargarListadoFerias(ferias))
    }

    return (
      <>
        <Metadata title={'Feria'}/>
        {isLoading ? (<Spinner />) : data.ferias.length === 0 ? (<Card title={'Listado de Ferias'}> <BlankState msg={'No hay ferias para mostrar'}/> </Card> ) : (<ListadoFerias />)}
      </>
    )
  
}

  
export default VisualizarListadoFerias;
