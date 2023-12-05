// components
import FeriaCard from "../../components/FeriaCard/FeriaCard"
import Spinner from "../../components/Spinner/Spinner"
import BlankState from "../../components/BlankState/BlankState"
import Card from "../../components/Card/Card"
import Metadata from "../../components/Metadata/Metadata"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useParams } from "react-router-dom"

const VisualizarFeria = () => {
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const { data, isLoading } = useAxiosFetch(`/feria/${id}`, axiosPrivate)

    return (
        <>
            <Metadata title={'Feria'}/>
            {isLoading ? (<Spinner />) : data ? (<FeriaCard handleDelete={() => {}} datosFeria={data?.feriaActiva} feriaActual={false} />) : <Card title={'Feria actual'}> <BlankState msg={'Actualmente no hay una feria activa.'}/> </Card> }
        </>
       
    )
}

export default VisualizarFeria