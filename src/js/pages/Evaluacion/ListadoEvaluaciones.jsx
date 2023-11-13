// components
import Spinner from "../../components/Spinner/Spinner"
import BlankState from "../../components/BlankState/BlankState"
import Card from "../../components/Card/Card"
import TablaEvaluaciones from "../../components/Evaluacion/TablaEvaluaciones"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { evaluacionActions } from "../../../store/evaluacion-slice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router"
import { ESTADOS } from "../../../App"

const headers = [
    {name: 'Título', value: 'titulo'},
    {name: 'Nivel', value: 'nivel'},
    {name: 'Categoría', value: 'categoria'},
    {name: 'Estado', value: 'nombreEstado'},
]

const mensajes = {
    '0': 'La evaluación de los proyectos en instancia regional aún no ha comenzado. ¡Intentá de nuevo mas tarde!',
    '1': 'La evaluación de los proyectos en instancia regional aún no ha comenzado. ¡Intentá de nuevo mas tarde!',
    '2': 'La evaluación de los proyectos en instancia regional aún no ha comenzado. ¡Intentá de nuevo mas tarde!',
    '3': 'La evaluación de los proyectos en instancia regional aún no ha comenzado. ¡Intentá de nuevo mas tarde!',
    '5': 'La evaluación de los proyectos en instancia regional ha finalizado. En breve se comenzará a evaluar la exposición de los proyectos.',
    '7': 'La evaluación de la exposición de los proyectos en instancia regional ha finalizado. La evaluación de los proyectos en instancia provincial aún no ha comenzado. ¡Intentá de nuevo mas tarde!',
    '8': 'La evaluación de la exposición de los proyectos en instancia regional ha finalizado. La evaluación de los proyectos en instancia provincial aún no ha comenzado. ¡Intentá de nuevo mas tarde!',
    '10': 'La evaluación de la exposición de los proyectos en instancia provincial ha finalizado. ¡Los resultados de la Feria de Ciencias y Tecnología de este año se publicarán en breve!',
    '11': 'La evaluación de la exposición de los proyectos en instancia provincial ha finalizado. ¡Los resultados de la Feria de Ciencias y Tecnología de este año se publicarán en breve!',
    '12': 'La Feria de Ciencias y Tecnología ha finalizado. ¡Esperamos contar con vos el próximo año!',
}

const titulos = {
    '4': 'Listado de Evaluaciones en instancia regional',
    '6': 'Listado de Exposiciones en instancia regional',
    '9': 'Listado de Exposiciones en instancia provincial',
}

const ListadoEvaluaciones = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const location = useLocation()
    const feria = useSelector(state => state.instancias.feria)

    // Instancia regional
    const { data: listadoData, isLoading } = useAxiosFetch('/evaluacion/pendientes', axiosPrivate, feria.estado === ESTADOS.instanciaProvincial_EnExposicion)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)

    // Instancia provincial
    const { data: listadoDataProvincial, isLoading: isLoadingProvincial } = useAxiosFetch('/exposicion-provincial/pendientes', axiosPrivate, !(feria.estado === ESTADOS.instanciaProvincial_EnExposicion))
    
    // loading
    const loading = feria.estado === ESTADOS.instanciaProvincial_EnExposicion ? isLoadingProvincial : isLoading
    
    const { proyectosMapping } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !loading })

    if(feria.estado !== ESTADOS.instanciaProvincial_EnExposicion && !isLoading && listadoData?.proyectos) {
        let proyectosFiltrados = []
        if(feria?.estado === ESTADOS.instanciaRegional_EnEvaluacion) {
            proyectosFiltrados = listadoData?.proyectos.filter(p => (parseInt(p.estado) === 1 && !p?.evaluacion) || (parseInt(p.estado) === 2 && p.evaluacion ))
            // proyectosFiltrados = listadoData?.proyectos.filter(p => parseInt(p.estado) < 3)
        } else {
            console.log(listadoData)
            proyectosFiltrados = listadoData?.proyectos.filter(p => parseInt(p.estado) === 2 && (parseInt(p.evaluacion.estado) === 3 || p.exposicion))
            console.log(proyectosFiltrados)
            // proyectosFiltrados = listadoData?.proyectos.filter(p => parseInt(p.estado) >= 3)
        }
        const proyectos = proyectosMapping(proyectosFiltrados)
        dispatch(evaluacionActions.cargarTablaEvaluacionesPendientes(proyectos))
    }

    if(feria.estado === ESTADOS.instanciaProvincial_EnExposicion && !isLoadingProvincial && listadoDataProvincial?.proyectos) {
        const proyectos = proyectosMapping(listadoDataProvincial?.proyectos)
        const proyectosConExpo = proyectos.map(p => {
            return {
                ...p,
                exposicionProvincial: p.exposicion
            }
        })
        dispatch(evaluacionActions.cargarTablaEvaluacionesPendientes(proyectosConExpo))
    }

    return (
        <div className="table-custom-page">
            <Card goBack={true} title={titulos[feria?.estado] ?? 'Listado de Evaluaciones'} wide={true}>
                    {loading ? 
                        <Spinner /> 
                        : parseInt(feria?.estado) < 4 || parseInt(feria?.estado) === 5 || parseInt(feria?.estado) === 7 || parseInt(feria?.estado) === 8 || parseInt(feria?.estado) > 9 ?
                        <BlankState msg={`${mensajes[feria?.estado]}`} />
                        :
                        <>
                            {listadoData?.length === 0 ?
                            <BlankState msg={`No hay ${feria?.estado === ESTADOS.instanciaRegional_EnEvaluacion ? 'proyectos' : 'exposiciones'} pendientes de evaluación. ¡Intentá de nuevo mas tarde!`} />
                            :
                            <TablaEvaluaciones location={location} headers={headers}/>}
                        </>
                    }
            </Card>
        </div>
    )

}

export default ListadoEvaluaciones;