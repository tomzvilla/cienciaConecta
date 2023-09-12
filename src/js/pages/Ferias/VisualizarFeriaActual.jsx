// components
import FeriaCard from "../../components/FeriaCard/FeriaCard"
import Spinner from "../../components/Spinner/Spinner"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const VisualizarFeriaActual = () => {

    const axiosPrivate = useAxiosPrivate()
    const { data } = useAxiosFetch('/feria/activa', axiosPrivate)

    return (
        !data ? (<Spinner />) : (<FeriaCard formData={data?.feriaActiva} />)
    )
}

export default VisualizarFeriaActual