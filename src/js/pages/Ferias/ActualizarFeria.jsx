// components
import Spinner from "../../components/Spinner/Spinner"
import ActualizarFeriaForm from "../../components/Feria/ActualizarFeriaForm"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useParams } from "react-router-dom"

const ActualizarFeria = () => {

    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { data } = useAxiosFetch('/feria', axiosPrivate) 
    const { data: sedesData} = useAxiosFetch('/establecimiento/sedes', axiosPrivate)
    const { data: sedeProvincialData } = useAxiosFetch(`/establecimiento/${data?.ferias[0].instancias.instanciaProvincial.sede}`, axiosPrivate, !data)
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
    console.log(sedeProvincialData)
    // el endpoint no esta listo
    //const { data } = useAxiosFetch(`/feria/${id}`, axiosPrivate)

    return (
        !data || !sedesData || !sedeProvincialData ? (<Spinner />) : (<ActualizarFeriaForm formData={data?.ferias[0]} sedes={sedes} sedeProvincial={sedeProvincialData}/>)
    )
}

export default ActualizarFeria;