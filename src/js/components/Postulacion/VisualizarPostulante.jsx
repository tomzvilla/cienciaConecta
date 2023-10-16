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
import { useState } from "react"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import capitalizeEachLetter from "../../utils/utils.js"


const VisualizarPostulante = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()

    // Cuando entro desde la tabla todos los datos OK. Pero cuando entro directamente a la pagina o la recargo, se rompe
    let postulacion = useSelector(state => state.postulaciones.listadoPostulantes)?.find(obj => obj._id === id)
    let nombre = postulacion?.datos_docente?.nombre + " " + postulacion?.datos_docente?.apellido || 'Cargando...'
    let cuil = postulacion?.datos_docente?.cuil || 'Cargando...'
    
    const [fileURL, setFileURL] = useState('')

    const {data: categoriaData, isLoading: loadingCategorias} = useAxiosFetch('/categoria', axiosPrivate, !!postulacion)
    const {data: nivelesData, isLoading: loadingNiveles} = useAxiosFetch('/nivel', axiosPrivate, !!postulacion)
    const {data: postulacionData, isLoading: isLoadingPostulacion} = useAxiosFetch(`/evaluador/postulaciones/${id}`, axiosPrivate, !!postulacion)

    const { evaluadorMap, proyectoMap } = useCategoriasNiveles({ categoriaData: categoriaData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles })

    let nivelesCompletos = []
    let categoriasCompletas = []
    if(!isLoadingPostulacion) {
      console.log(postulacionData)
    }

    if(postulacion && categoriaData && nivelesData) {
      //postulacion = evaluadorMap(postulacion)
      console.log(postulacion)
    } else if(postulacionData && categoriaData && nivelesData) {
      postulacion = evaluadorMap(postulacionData.postulacion)
    }

    
    
    let nombreSede;
  // const establecimientoData = useAxiosFetch('/establecimiento/id/'+ postulacion.sede, axiosPrivate)
    // if (establecimientoData.data) {
    //     nombreSede = establecimientoData.data.establecimiento.nombre;
    // }



    const handleDownload = async () => {
        await cargarCv()
        const pdfWindow = window.open();
        pdfWindow.location.href = fileURL; 
    }

    const cargarCv= async () => {
        try {
            await axiosPrivate
              .get(`/evaluador/download/v3/cv/${id}`, {
                responseType: "blob"
              })
              .then((response) => {
                //Create a Blob from the PDF Stream
                const file = new Blob([response.data], { type: "application/pdf" });
                const fileURL = window.URL.createObjectURL(file);
                setFileURL(fileURL)
                          
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (error) {
            return { error };
          }
    }

    cargarCv()
    
    // 

    const formatCuil = (input) => {
        // Eliminar todos los caracteres no numéricos
        const numericInput = input.replace(/\D/g, '');
    
        // Aplicar el formato con guiones
        if (numericInput.length <= 2) {
          return numericInput;
        } else if (numericInput.length <= 10) {
          return `${numericInput.slice(0, 2)}-${numericInput.slice(2)}`;
        } else {
          return `${numericInput.slice(0, 2)}-${numericInput.slice(2, 10)}-${numericInput.slice(10, 11)}`;
        }
      };

    const show = postulacion

    return (
        <Card title="Visualizar Postulante" header={<PostulanteHeader title={nombre} subtitle={formatCuil(cuil)}/>}>
            <div>
                {!show  ? 
                    <Spinner/> 
                    : 
                    <DatosPostulante 
                        sede={capitalizeEachLetter(nombreSede)} 
                        cargo={postulacion?.datos_docente?.cargo} 
                        niveles={nivelesCompletos}
                        categorias={categoriasCompletas} 
                        antecedentes={postulacion?.antecedentes}
                        handleDownload={handleDownload}
                    />
                }
            </div>
        </Card>    
        
    );
}

export default VisualizarPostulante;