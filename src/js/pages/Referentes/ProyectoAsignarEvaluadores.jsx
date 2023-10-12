// components
import Spinner from "../../components/Spinner/Spinner"
import AsignarEvaluadores from "../../components/AsignarEvaluadores/AsignarEvaluadores"

// hooks
import { useParams } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { referentesActions } from "../../../store/referentes-slice"
import { useEffect, useState } from "react"

const ProyectoAsignarEvaluadores = () => {

    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()


    let proyecto = useSelector(state => state.referentes.proyectosReferente)?.find(p => p._id === id)
    // Si recarga la pagina se hacen estas consultas
    const { data: proyectoData, isLoading } = useAxiosFetch(`/proyecto/${id}`, axiosPrivate, !!proyecto)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)
    const { data: evaluadoresData, isLoading: loadingEvaluadores } = useAxiosFetch(`/referente/evaluadores/${id}`, axiosPrivate)

    const { evaluadorMapping, proyectoMap } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && (!loadingEvaluadores || !isLoading) })
    
    if(!isLoading && proyectoData?.proyecto) {
        proyecto = proyectoMap(proyectoData)
    }

    if(!loadingEvaluadores && evaluadoresData) {
        const evaluadores = evaluadorMapping(evaluadoresData.evaluadores).sort((a, b) => b.coincidencia - a.coincidencia)
        dispatch(referentesActions.cargarEvaluadores(evaluadores))
    }


    return (
        (!proyecto || loadingEvaluadores) ?
        <Spinner />
        :
        <AsignarEvaluadores proyecto={proyecto} evaluadores={evaluadoresData?.evaluadores} />
    )
}

export default ProyectoAsignarEvaluadores