// components
import Card from "../Card/Card"
import Badge from "../Badge/Badge"
import Button from "../Button/Button"
import DownloadFile from "../DownloadFile/DownloadFile"
// hooks
import { useParams, useNavigate, useLocation } from "react-router"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { useSelector } from "react-redux"
import { useState } from "react"

import Swal from "sweetalert2"

const EvaluacionCard = () => {
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const [link, setLink] = useState('')

    let proyecto = useSelector(state => state.evaluacion.listadoEvaluaciones.find(p => p._id === id))

    // Si recarga la pagina se hacen estas consultas
    const { data: proyectoData, isLoading } = useAxiosFetch(`/evaluacion/pendientes/${id}`, axiosPrivate, !!proyecto)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate, !!proyecto)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, !!proyecto)

    const { proyectoMap } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading })
   
    if(!isLoading && proyectoData?.proyecto) {
        proyecto = proyectoMap(proyectoData)
        proyecto['evaluacion'] = proyectoData.evaluacion 
    }

    const navigate = useNavigate()
    
    const iniciarEvaluacion = () => {
        navigate(`/evaluar/${id}/iniciar`, {state: {from: location.pathname }})
    }
    const { data } = useAxiosFetch(`/proyecto/download/${id}/${link}`, axiosPrivate, link === '')

    const handleDownload = async (type) => {
        setLink(type)
        if(data) {
            const file = new Blob([data], { type: 'application/pdf' })
            const fileURL = window.URL.createObjectURL(file);
            const pdfWindow = window.open();
            pdfWindow.location.href = fileURL; 
        }

    }

    // confirmar evaluacion

    const handleConfirmar = () => {
        Swal.fire({
            title: '¿Deseas confirmar la evaluación de proyecto?',
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
                    title: '¡Evaluación Confirmada!',
                    text: 'Confirmaste con éxito la evaluación de este proyecto',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) { 
                        navigate('/evaluar', {replace: true, state: { from:`${location.pathname}`}})
                        
                    }
                })
            }
        })
    }


    const confirmarEvaluacion = async () => {
        try {
            const response = await axiosPrivate.get(`/evaluacion/confirmar/${id}`)
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
                msg = `Falló la confirmación de la evaluación <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la confirmación de la evaluación',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }
    }


    return(
        proyecto ?
        <Card title={proyecto.titulo}>
            <div className="project-card-details">
                <p className="project-card-details__detail">
                    <strong>Descripción: </strong> 
                    {proyecto.descripcion}
                </p>
                <p className="project-card-details__detail">
                    <strong>Categoria: </strong> 
                    <Badge type={proyecto.categoria} />
                </p>
                <p className="project-card-details__detail">
                    <strong>Nivel: </strong> 
                    <Badge type={proyecto.nivel} />
                </p>
                <p className="project-card-details__detail">
                    <strong>Estado: </strong> 
                    {proyecto.nombreEstado}
                </p>
                <div className="project-card-details__detail">
                    <DownloadFile onClick={() => handleDownload('informeTrabajo')} name="Informe de trabajo" img={require("../../../assets/tarjeta.png")}/>
                </div>
                <div className="project-card-details__detail">
                    <DownloadFile onClick={() => handleDownload('carpetaCampo')} name="Carpeta de Campo" img={require("../../../assets/tarjeta.png")}/>
                </div>
                <div className="project-card-details__detail">
                    <DownloadFile onClick={() => handleDownload('registroPedagogico ')} name="Registro Pedagógico" img={require("../../../assets/tarjeta.png")}/>
                </div>
                <div className="project-card-details__detail">
                    <DownloadFile name="Video" img={require("../../../assets/tarjeta.png")}/>
                </div>
                <div className="project-card-details__detail">
                    <strong>Evaluaciones</strong>
                    <div>
                        Realizadas
                        {!proyecto.evaluacion ?
                        proyecto.evaluadoresRegionales.map( e =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} disabled />
                        )
                        :
                        proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} disabled checked={index <= proyecto.evaluacion?.evaluadorId?.length - 1} />
                        )
                    }
                    </div>
                    <div>
                        Confirmadas
                        {!proyecto?.evaluacion ?
                        proyecto.evaluadoresRegionales.map( e =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} disabled />
                        )
                        :
                        proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} disabled checked={index <= proyecto?.evaluacion.listo.length - 1} />
                        )
                    }
                    </div>
                </div>
            </div>
            <div>
                <Button 
                    text='Evaluar' 
                    onClickHandler={iniciarEvaluacion}
                    activo={true}
                />
                {console.log(!proyecto.evaluacion)}
                {console.log(proyecto)}
                <Button 
                    text='Confirmar' 
                    onClickHandler={handleConfirmar}
                    activo={true}
                    disabled={!proyecto?.evaluacion ? true : proyecto.evaluadoresRegionales.length > proyecto?.evaluacion?.evaluadorId?.length ? true : false}
                />
            </div>
        </Card>
        :
        null
    )

}

export default EvaluacionCard