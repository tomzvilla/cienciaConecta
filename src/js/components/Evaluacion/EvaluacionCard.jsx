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

import Swal from "sweetalert2"

const EvaluacionCard = () => {
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const dispatch = useDispatch()

    let proyecto = useSelector(state => state.evaluacion.listadoEvaluaciones.find(p => p._id === id))
    const instancia = useSelector(state => state.instancias.instancia)
    const evaluationMsg = instancia === 'regional' ? 'evaluación teórica' : 'evaluación de exposición'
    const evaluationMsgMayuscula = instancia === 'regional' ? 'Evaluación Teórica' : 'Evaluación de Exposición'
    // Si recarga la pagina se hacen estas consultas
    const { data: proyectoData, isLoading } = useAxiosFetch(`/evaluacion/pendientes/${id}`, axiosPrivate, !!proyecto)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate, !!proyecto)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, !!proyecto)

    const { proyectoMap } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading })
   
    if(!isLoading && proyectoData?.proyecto) {
        proyecto = proyectoMap(proyectoData)
        proyecto['evaluacion'] = proyectoData.evaluacion
        proyecto['exposicion'] = proyectoData.exposicion
    }

    const navigate = useNavigate()
    
    const iniciarEvaluacion = () => {
        navigate(`/evaluar/${id}/iniciar`, {state: {from: location.pathname }})

    }

    const handleDownload = async (link) => {
        const fileURL = await downloadFile(link);
        if (fileURL) {
          try {
            const pdfWindow = window.open();
            if(!pdfWindow) {
              throw new Error('No se pudo abrir la ventana emergente. Verifique la configuración del navegador.')
            }
            pdfWindow.location.href = fileURL;
          } catch (err) {
            Swal.fire({
              title: 'Hubo un problema',
              icon: 'warning',
              text: 'No se pudo abrir el archivo en una nueva pestaña. Habilita las ventanas emergentes en tu navegador para resolver este problema.',
              confirmButtonText: 'OK',
              confirmButtonColor: '#00ACE6'
            })
          }
        }
    }

    const handleOpen = (link) => {
        try {
            if(!link) {
                throw new Error('No se pudo obtener el video.')
            }
            const newWindow = window.open();
            if(!newWindow) {
              throw new Error('No se pudo abrir la ventana emergente. Verifique la configuración del navegador.')
            }
            newWindow.location.href = link;
          } catch (err) {
            Swal.fire({
              title: 'Hubo un problema',
              icon: 'warning',
              text: 'No se pudo abrir el video en una nueva pestaña. Habilita las ventanas emergentes en tu navegador para resolver este problema.',
              confirmButtonText: 'OK',
              confirmButtonColor: '#00ACE6'
            })
          }

    }


    const downloadFile = async (link) => {
        try {
          const response = await axiosPrivate.get(`/proyecto/download/${id}/${link}`, { responseType: "blob"});
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = window.URL.createObjectURL(file);
          return fileURL; 
        } 
        catch (error) {
          console.log(error)
          return null;
        }
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
                        instancia === 'regional' ? dispatch(evaluacionActions.actualizarListosEvaluacion(id)) : dispatch(evaluacionActions.actualizarListosExposicion(id))
                        navigate('/evaluar', {replace: true, state: { from:`${location.pathname}`}})
                        
                    }
                })
            }
        })
    }


    const confirmarEvaluacion = async () => {
        try {
            const endpoint = instancia === 'regional' ? 'evaluacion' : 'exposicion'
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
                    <DownloadFile onClick={() => handleDownload('informeTrabajo')} name="Informe de trabajo" img={require("../../../assets/tarjeta.png")}/>
                    <DownloadFile onClick={() => handleDownload('carpetaCampo')} name="Carpeta de Campo" img={require("../../../assets/tarjeta.png")}/>
                    <DownloadFile onClick={() => handleDownload('registroPedagogico')} name="Registro Pedagógico" img={require("../../../assets/tarjeta.png")}/>
                    <DownloadFile onClick={() => handleOpen(proyecto.videoPresentacion)} name="Video" img={require("../../../assets/tarjeta.png")}/>
                </div>

               
                
                <div className="evaluacion-card__evaluacion">
                    <strong>{evaluationMsgMayuscula}</strong>
                    <div>
                        Realizadas:
                        {!proyecto?.evaluacion ?

                        proyecto.evaluadoresRegionales.map( e =>
                            <input type="checkbox" key={e} id={e} disabled />
                        )
                        :
                        proyecto.estado < 3 ?
                        proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} disabled checked={index <= proyecto.evaluacion?.evaluadorId?.length - 1} />
                        )
                        :
                        proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} disabled checked={index <= proyecto.exposicion?.evaluadorId?.length - 1} />
                        )
                    }
                    </div>
                    <div>
                        Confirmadas:
                        {!proyecto?.evaluacion ?
                        proyecto.evaluadoresRegionales.map( e =>
                            <input type="checkbox" key={e} id={e} disabled />
                        )
                        :
                        proyecto.estado < 3 ?
                        proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} disabled checked={index <= proyecto?.evaluacion.listo.length - 1} />

                        )
                        :
                        proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} disabled checked={index <= proyecto?.exposicion?.listo.length - 1} />

                        )
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
                    proyecto.estado < 3 ?
                    <Button 
                        text='Confirmar' 
                        onClickHandler={handleConfirmar}
                        activo={true}
                        disabled={!proyecto?.evaluacion ? true : proyecto.evaluadoresRegionales.length > proyecto?.evaluacion?.evaluadorId?.length ? true : false}
                    />
                    :
                    <Button 
                        text='Confirmar' 
                        onClickHandler={handleConfirmar}
                        activo={true}
                        disabled={!proyecto?.exposicion ? true : proyecto.evaluadoresRegionales.length > proyecto?.exposicion?.evaluadorId?.length ? true : false}
                    />
                }

            </div>
        </Card>
        :
        <Spinner/>
        
    )

}

export default EvaluacionCard