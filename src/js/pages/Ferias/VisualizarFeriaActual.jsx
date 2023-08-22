// components
import FeriaCard from "../../components/FeriaCard/FeriaCard"
import Spinner from "../../components/Spinner/Spinner"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const VisualizarFeriaActual = () => {

    const axiosPrivate = useAxiosPrivate()
    const { data } = useAxiosFetch('/feria', axiosPrivate)

    return (
        !data ? (<Spinner />) : (<FeriaCard formData={data?.ferias[0]} />)
    )
}

export default VisualizarFeriaActual