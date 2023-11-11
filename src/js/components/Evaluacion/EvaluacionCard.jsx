// components
import Card from "../Card/Card"
import Badge from "../Badge/Badge"
import Button from "../Button/Button"
import DownloadFile from "../DownloadFile/DownloadFile"
import Spinner from "../Spinner/Spinner"

// hooks
import { useParams, useNavigate, useLocation } from "react-router"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { useSelector, useDispatch } from "react-redux"
import { evaluacionActions } from "../../../store/evaluacion-slice"
import { ESTADOS } from "../../../App"

import Swal from "sweetalert2"

const EvaluacionCard = () => {
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const dispatch = useDispatch()

    let proyecto = useSelector(state => state.evaluacion.listadoEvaluaciones.find(p => p._id === id))
    const feria = useSelector(state => state.instancias.feria)
    const endpoint = feria?.estado === ESTADOS.instanciaRegional_EnEvaluacion ? 'evaluacion' : feria?.estado === ESTADOS.instanciaRegional_EnExposicion ? 'exposicion' : 'exposicion-provincial'

    const evaluationMsg = feria?.estado === ESTADOS.instanciaRegional_EnEvaluacion ? 'evaluación teórica regional' : feria?.estado === ESTADOS.instanciaRegional_EnExposicion ? 'evaluación de exposición regional' : 'evaluación de exposición provincial'
    const evaluationMsgMayuscula = feria?.estado === ESTADOS.instanciaRegional_EnEvaluacion ? 'Evaluación Teórica Regional' : feria?.estado === ESTADOS.instanciaRegional_EnExposicion ? 'Evaluación de Exposición Regional' : 'Evaluación de Exposición Provincial' 
    // Si recarga la pagina se hacen estas consultas
    const { data: proyectoData, isLoading } = useAxiosFetch(`/${endpoint}/pendientes/${id}`, axiosPrivate, !!proyecto)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate, !!proyecto)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, !!proyecto)

    const { proyectoMap } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading })
   
    if(!isLoading && proyectoData?.proyecto) {
        proyecto = proyectoMap(proyectoData)
        proyecto['nombreEstado'] = proyectoData.nombreEstado
        if(feria?.estado === ESTADOS.instanciaProvincial_EnExposicion) {
            proyecto['exposicionProvincial'] = proyectoData.exposicion
        } else {
            proyecto['evaluacion'] = proyectoData.evaluacion
            proyecto['exposicion'] = proyectoData.exposicion
        }
    }

    const navigate = useNavigate()
    
    const iniciarEvaluacion = () => {
        navigate(`/evaluar/${id}/iniciar`, {state: {from: location.pathname }})

    }

    // confirmar evaluacion

    const handleConfirmar = () => {
        Swal.fire({
            title: `¿Deseas confirmar la ${evaluationMsg} de proyecto?`,
            icon: 'question',
            text: 'Puede que otro evaluador haya hecho modificaciones, ¿estás seguro de confirmarla?',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await confirmarEvaluacion()
                if(success) Swal.fire({
                    title: `¡${evaluationMsgMayuscula} Confirmada!`,
                    text: `Confirmaste con éxito la ${evaluationMsg} de este proyecto`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
                        feria?.estado === ESTADOS.instanciaRegional_EnEvaluacion ? 
                        dispatch(evaluacionActions.actualizarListosEvaluacion(id)) 
                        :
                        feria?.estado === ESTADOS.instanciaRegional_EnExposicion ?
                        dispatch(evaluacionActions.actualizarListosExposicion(id))
                        :
                        dispatch(evaluacionActions.actualizarListosExposicionProvincial(id))
                        navigate('/evaluar', {replace: true, state: { from:`${location.pathname}`}})
                    }
                })
            }
        })
    }


    const confirmarEvaluacion = async () => {
        try {
            const response = await axiosPrivate.get(`/${endpoint}/confirmar/${id}`)
            return response.status === 200
        } catch (err) {
            let msg = ''
            console.log(JSON.stringify(err.response.data))
            if(!err?.response){
                msg = 'El servidor no respondió'
            } else if(err.response?.status === 403) {
                msg = 'Datos incorrectos intente nuevamente'
            } else if(err.response?.status === 401) {
                msg = `No estas autorizado para realizar esta operación. <br> ${err.response.data.error}`
            } else {
                msg = `Falló la confirmación de la ${evaluationMsg} <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: `Falló la confirmación de la ${evaluationMsg}`,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }
    }


    return(
        proyecto ?
        <Card title={proyecto.titulo} goBack={true}>
            <div className="evaluacion-card">
                <div className="evaluacion-card__data">
                    <p>
                        <strong >Descripción: </strong> 
                        {proyecto.descripcion}
                    </p>
                    <p>
                        <strong >Categoria: </strong> 
                        <Badge type={proyecto.categoria} />
                    </p>
                    <p>
                        <strong >Nivel: </strong> 
                        <Badge type={proyecto.nivel} />
                    </p>
                    <p>
                        <strong >Estado: </strong> 
                        {proyecto.nombreEstado}
                    </p>


                </div>
                
                <div className="evaluacion-card__files">
                    <DownloadFile file='informeTrabajo'  name="Informe de trabajo" img={require("../../../assets/tarjeta.png")}/>
                    <DownloadFile file='carpetaCampo'  name="Carpeta de Campo" img={require("../../../assets/tarjeta.png")}/>
                    <DownloadFile file='registroPedagogico' name="Registro Pedagógico" img={require("../../../assets/tarjeta.png")}/>
                    <DownloadFile video={proyecto.videoPresentacion}  name="Video" img={require("../../../assets/tarjeta.png")}/>
                </div>

               
                
                <div className="evaluacion-card__evaluacion">
                    <strong>{evaluationMsgMayuscula}</strong>
                    <div>
                        Realizadas:
                        {
                            feria.estado === ESTADOS.instanciaRegional_EnEvaluacion ?
                            proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} disabled checked={index <= proyecto.evaluacion?.evaluadorId?.length - 1} />)
                            :
                            feria.estado === ESTADOS.instanciaRegional_EnExposicion ?
                            proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} disabled checked={index <= proyecto.evaluacion?.evaluadorId?.length - 1} />)
                            :
                            proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} disabled checked={index <= proyecto.exposicionProvincial?.evaluadorId?.length - 1} />)
                        }
                    </div>
                    <div>
                        Confirmadas:
                        {
                            feria.estado === ESTADOS.instanciaRegional_EnEvaluacion ?
                            proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} disabled checked={index <= proyecto.evaluacion?.listo?.length - 1} />)
                            :
                            feria.estado === ESTADOS.instanciaRegional_EnExposicion ?
                            proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} disabled checked={index <= proyecto.evaluacion?.listo?.length - 1} />)
                            :
                            proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} disabled checked={index <= proyecto.exposicionProvincial?.listo?.length - 1} />)
                        }
                    </div>
                </div>
            </div>
            <div className="button-container">
                <Button 
                    text='Evaluar' 
                    onClickHandler={iniciarEvaluacion}
                    activo={true}
                />
                {
                    feria.estado === ESTADOS.instanciaRegional_EnEvaluacion ?
                    <Button 
                        text='Confirmar' 
                        onClickHandler={handleConfirmar}
                        activo={true}
                        disabled={!proyecto?.evaluacion ? true : proyecto.evaluadoresRegionales.length > proyecto?.evaluacion?.evaluadorId?.length ? true : false}
                    />
                    :
                    feria.estado === ESTADOS.instanciaRegional_EnExposicion ?
                    <Button 
                        text='Confirmar' 
                        onClickHandler={handleConfirmar}
                        activo={true}
                        disabled={!proyecto?.exposicion ? true : proyecto.evaluadoresRegionales.length > proyecto?.exposicion?.evaluadorId?.length ? true : false}
                    />
                    :
                    <Button 
                        text='Confirmar' 
                        onClickHandler={handleConfirmar}
                        activo={true}
                        disabled={!proyecto?.exposicionProvincial ? true : proyecto.evaluadoresRegionales.length > proyecto?.exposicionProvincial?.evaluadorId?.length ? true : false}
                    />
                }

            </div>
        </Card>
        :
        <Spinner/>
        
    )

}

export default EvaluacionCard