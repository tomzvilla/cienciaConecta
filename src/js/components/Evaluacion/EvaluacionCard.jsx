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
        proyecto = proyectoMap(proyectoData.proyecto)
    }

    const navigate = useNavigate()
    
    const iniciarEvaluacion = () => {
        navigate(`/evaluar/${id}/iniciar`, {state: {from: location.pathname }})
    }

    console.log(proyecto)
    console.log(link)
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
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} disabled checked={index < proyecto.evaluacion.evaluadorId.length} />
                        )
                    }
                    </div>
                    <div>
                        Confirmadas
                        {!proyecto.evaluacion ?
                        proyecto.evaluadoresRegionales.map( e =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} disabled />
                        )
                        :
                        proyecto.evaluadoresRegionales.map( (e, index) =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} disabled checked={index < proyecto.evaluacion.listo.length} />
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
                <Button 
                    text='Confirmar' 
                    onClickHandler={() => {}}
                    activo={true}
                    disabled={true}
                />
            </div>
        </Card>
        :
        null
    )

}

export default EvaluacionCard