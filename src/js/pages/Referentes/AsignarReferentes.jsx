// components
import Spinner from "../../components/Spinner/Spinner"
import Card from "../../components/Card/Card"
import TablaReferentes from "../../components/TablaReferentes/TablaReferentes"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useEffect, useState } from "react"

import { useDispatch } from "react-redux"
import { referentesActions } from "../../../store/referentes-slice"

const headers = [
    {name: 'Sede', value: 'nombre'},
    {name: 'Referente de Evaluador', value: 'referente'},
]

const AsignarReferentes = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()

    const { data, isLoading } = useAxiosFetch(`/establecimiento/sedes/regional`, axiosPrivate)
    const { data: docenteData, isLoading: isLoadingDocentes} = useAxiosFetch(`/referente`, axiosPrivate)
    const { data: referentesData, isLoading: isLoadingReferentes} = useAxiosFetch(`/referente/asignados`, axiosPrivate)
    const [loadingMapping, setLoadingMapping] = useState(true)

    useEffect(() => {
        const mapReferentes = () => {
            return data.sedes.map(s => {
                const referente = referentesData.referentes.find(r => r.sede === s._id)
                return {
                    sede: s,
                    referente: referente || ''
                } 
            })
        }

        if(!isLoading && !isLoadingReferentes) {
            const datosReferentes = mapReferentes()
            dispatch(referentesActions.cargarReferentes(datosReferentes))
            setLoadingMapping(false)
        }
    }, [isLoading, isLoadingReferentes])

    return (
        isLoading && isLoadingDocentes && loadingMapping && !data && !docenteData ?  
        <Spinner /> 
        :
        <Card title={'Asignar Referentes a Sedes'} wide={true}>
            <TablaReferentes sedes={data?.sedes} usuarios={docenteData?.usuarios} headers={headers}/>
        </Card>
    )
}

export default AsignarReferentes