// components
import Spinner from "../../components/Spinner/Spinner"
import ActualizarFeriaForm from "../../components/Feria/ActualizarFeriaForm"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useParams } from "react-router-dom"

const ActualizarFeria = () => {

    const axiosPrivate = useAxiosPrivate()
    const { data } = useAxiosFetch('/feria/activa', axiosPrivate) 
    const { data: sedesData} = useAxiosFetch('/establecimiento/sedes/regional', axiosPrivate)
    const { data: sedeProvincialData } = useAxiosFetch(`/establecimiento/sedes/provincial`, axiosPrivate)
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
    return (
        !data || !sedesData || !sedeProvincialData ? (<Spinner />) : (<ActualizarFeriaForm formData={data?.feriaActiva} sedes={sedes} sedeProvincial={sedeProvincialData.sede}/>)
    )
}

export default ActualizarFeria;