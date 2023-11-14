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

import Swal from "sweetalert2"

const EvaluacionCardConsulta = () => {
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    let proyecto = {}
    const puntaje = useSelector(state => state.promociones.puntaje)
    // Si recarga la pagina se hacen estas consultas
    const { data: proyectoData, isLoading } = useAxiosFetch(`/proyecto/${id}`, axiosPrivate)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate)

    const { proyectoMap } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading })

    if(!isLoading) {
        proyecto = proyectoMap(proyectoData)
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

    const verEvaluacion = () => {
        navigate(`/evaluacion/${id}/consultar`, {state: {from: location.pathname }})
    }

    return(
        !isLoading ?
        <Card title={proyecto.titulo} goBack={'/promoverProyectos'}>
            <div className="evaluacion-card">
                <div className="evaluacion-card__data">
                    <p>
                        <strong >Descripción: </strong> 
                        {proyecto.descripcion}
                    </p>
                    <p>
                        <strong >Categoría: </strong> 
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
                <div className="evaluacion-card__puntaje">
                    <p>Puntaje: {puntaje}</p>
                </div>
                <div className="evaluacion-card__button-container">
                      <Button 
                          text='Ver evaluación' 
                          onClickHandler={verEvaluacion}
                          activo={true}
                      />
                </div>
                

            </div>
        </Card>
        :
        <Spinner/>
        
    )

}

export default EvaluacionCardConsulta