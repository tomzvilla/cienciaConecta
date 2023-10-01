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
import { useSelector } from "react-redux"
import { useState } from "react"

import Swal from "sweetalert2"

const EvaluacionCard = () => {
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const [link, setLink] = useState('')
    const [confirm, setConfirm] = useState(true)

    let proyecto = useSelector(state => state.evaluacion.listadoEvaluaciones.find(p => p._id === id))

    // Si recarga la pagina se hacen estas consultas
    const { data: proyectoData, isLoading } = useAxiosFetch(`/evaluacion/pendientes/${id}`, axiosPrivate, !!proyecto)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate, !!proyecto)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, !!proyecto)

    const { proyectoMap } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading })
   
    if(!isLoading && proyectoData?.proyecto) {
        proyecto = proyectoMap(proyectoData)
        
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

    console.log(proyecto)
    // confirmar evaluacion

    const handleConfirmar = () => {
        Swal.fire({
            title: '¿Deseas confirmar la evaluación de proyecto?',
            icon: 'question',
            text: 'Puede que otro evaluador haya hecho modificaciones, ¿estás seguro de confirmarla?',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Evaluar',
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
            axiosPrivate.get(`/evaluacion/confirmar/${id}`)
            return true
        } catch (err) {
            console.log(err)
        }
    }


    return(
        proyecto ?
        <Card title={proyecto.titulo}>

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
                        <DownloadFile onClick={() => handleDownload('registroPedagogico ')} name="Registro Pedagógico" img={require("../../../assets/tarjeta.png")}/>
                        <DownloadFile name="Video" img={require("../../../assets/tarjeta.png")}/>
                </div>

               
                
                <div className="evaluacion-card__evaluacion">
                    <strong>Evaluaciones</strong>
                    <div>
                        Realizadas:
                        {!proyecto?.evaluacion ?
                        proyecto.evaluadoresRegionales.map( e =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} disabled />
                        )
                        :
                        proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} disabled checked={index <= proyecto.evaluacion?.evaluadorId.length} />
                        )
                    }
                    </div>
                    <div>
                        Confirmadas:
                        {!proyecto?.evaluacion ?
                        proyecto.evaluadoresRegionales.map( e =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} disabled />
                        )
                        :
                        proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} disabled checked={index < proyecto.evaluacion?.listo.length} />
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
                <Button 
                    text='Confirmar' 
                    onClickHandler={confirmarEvaluacion}
                    activo={true}
                    disabled={!proyecto?.evaluacion ? true : proyecto.evaluadoresRegionales.length > proyecto.evaluacion?.evaluadorId.length ? false : true}
                />
                {/* {console.log(proyecto.evaluadoresRegionales.length > proyecto.evaluacion.evaluadorId.length)} */}
            </div>
        </Card>
        :
        <Spinner/>
        
    )

}

export default EvaluacionCard