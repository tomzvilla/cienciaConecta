// components
import Spinner from "../../components/Spinner/Spinner"
import ActualizarFeriaForm from "../../components/Feria/ActualizarFeriaForm"
import Metadata from "../../components/Metadata/Metadata"
import ProgressBar from "../../components/ProgressBar/ProgressBar"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { feriaActions } from "../../../store/feria-slice"
import { ETAPAS } from '../../components/Feria/CrearFeriaForm'

const ActualizarFeria = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const [etapaActual, setEtapaActual] = useState(ETAPAS.Datos)
    const { data } = useAxiosFetch('/feria/activa', axiosPrivate) 
    const { data: sedesData} = useAxiosFetch('/establecimiento/sedes/regional', axiosPrivate)
    let sedes = []
    if(sedesData){
        sedes = [...sedesData.sedes].sort((sede1, sede2) => {
            if (sede1.nombre < sede2.nombre) {
              return -1; 
            } else if (sede1.nombre > sede2.nombre) {
              return 1;
            }
            return 0;
        });
    }
    if(data) {
      dispatch(feriaActions.cargarRubricas(data.feriaActiva.criteriosEvaluacion))
    }

    return (
      <>
        <ProgressBar etapas={ETAPAS} etapaActual={etapaActual}/>
        <Metadata title={'Feria'}/>
        {!data || !sedesData ? (<Spinner />) : (<ActualizarFeriaForm formData={data?.feriaActiva} sedes={sedes}/>)}
      </>
    )
        
}

export default ActualizarFeria;