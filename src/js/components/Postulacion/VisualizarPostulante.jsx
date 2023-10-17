// components
import Card from "../Card/Card"
import Spinner from "../../components/Spinner/Spinner"
import DatosPostulante from "./DatosPostulante"
import PostulanteHeader from "../Card/PostulanteHeader"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import useUtils from '../../hooks/useUtils'
import capitalizeEachLetter from "../../utils/utils.js"

import Swal from "sweetalert2"

const VisualizarPostulante = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { formatCuil } = useUtils()

    // Cuando entro desde la tabla todos los datos OK. Pero cuando entro directamente a la pagina o la recargo, se rompe
    let postulacion = useSelector(state => state.postulaciones.listadoPostulantes)?.find(obj => obj._id === id)
    let nombre = postulacion?.datos_docente ? postulacion?.datos_docente?.nombre + " " + postulacion?.datos_docente?.apellido : 'Cargando...'
    let cuil = postulacion?.datos_docente ? formatCuil(postulacion?.datos_docente?.cuil) : ''

    const {data: categoriaData, isLoading: loadingCategorias} = useAxiosFetch('/categoria', axiosPrivate, !!postulacion)
    const {data: nivelesData, isLoading: loadingNiveles} = useAxiosFetch('/nivel', axiosPrivate, !!postulacion)
    const {data: postulacionData, isLoading: isLoadingPostulacion} = useAxiosFetch(`/evaluador/postulaciones/${id}`, axiosPrivate, !!postulacion)

    const { evaluadorMap } = useCategoriasNiveles({ categoriaData: categoriaData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles })

    if(postulacionData && categoriaData && nivelesData) {
      postulacion = evaluadorMap(postulacionData.postulacion)
      console.log(postulacion)
      nombre = postulacion?.datos_docente?.nombre + " " + postulacion?.datos_docente?.apellido ?? 'Cargando...'
      cuil = postulacion?.datos_docente?.cuil ?? 'Cargando...'
    }

    const handleDownload = async () => {
        const fileURL = await cargarCv();
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
              text: 'No se pudo abrir el CV en una nueva pestaña. Habilita las ventanas emergentes en tu navegador para resolver este problema.',
              confirmButtonText: 'OK',
              confirmButtonColor: '#00ACE6'
            })
          }
        }
    }

    const cargarCv = async () => {
        try {
          const response = await axiosPrivate.get(`/evaluador/download/v3/cv/${id}`, { responseType: "blob"});
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = window.URL.createObjectURL(file);
          return fileURL; 
        } 
        catch (error) {
          console.log(error)
          return null;
        }
    }

    const show = postulacion

    return (
        <Card title="Visualizar Postulante" header={<PostulanteHeader title={nombre} subtitle={formatCuil(cuil)}/>}>
            <div>
                {!show  ? 
                    <Spinner/> 
                    : 
                    <DatosPostulante 
                        sede={postulacion ? capitalizeEachLetter(postulacion?.datos_establecimiento.nombre) : 'Cargando...'} 
                        cargo={postulacion?.datos_docente?.cargo} 
                        niveles={postulacion?.niveles}
                        categorias={postulacion?.categorias} 
                        antecedentes={postulacion?.antecedentes}
                        handleDownload={handleDownload}
                    />
                }
            </div>
        </Card>    
        
    );
}

export default VisualizarPostulante;