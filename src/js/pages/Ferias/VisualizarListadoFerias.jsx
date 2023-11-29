// Components
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

const VisualizarListadoFerias = () => {
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    let loading = true
    const { data, isLoading } = useAxiosFetch('/feria', axiosPrivate)

    if (!isLoading) {
        dispatch(feriaActions.cargarListadoFerias(data.ferias))
        loading = false
    }

    return (
      <>
        <Metadata title={'Feria'}/>
        {loading ? (<Spinner />) : data.ferias.length === 0 ? (<Card title={'Listado de Ferias'}> <BlankState msg={'No hay ferias para mostrar'}/> </Card> ) : (<ListadoFerias />)}
      </>
    )
  
}

  
export default VisualizarListadoFerias;
