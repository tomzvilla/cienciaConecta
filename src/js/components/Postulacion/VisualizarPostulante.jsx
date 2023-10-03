import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useParams } from "react-router"
import Card from "../Card/Card"
import Spinner from "../../components/Spinner/Spinner"
import { useSelector } from "react-redux"
import capitalizeEachLetter from "../../utils/utils.js"
import DatosPostulante from "./DatosPostulante"
import PostulanteHeader from "../Card/PostulanteHeader"
import { useState } from "react"

const VisualizarPostulante = (props) => {
    const axiosPrivate = useAxiosPrivate()

    // Cuando entro desde la tabla todos los datos OK. Pero cuando entro directamente a la pagina o la recargo, se rompe
    const data = useSelector(state => state.postulaciones.listadoPostulantes)
    const [fileURL, setFileURL] = useState('')

    const { id } = useParams()
    const {data: categoriaData} = useAxiosFetch('/categoria', axiosPrivate)
    const {data: nivelesData} = useAxiosFetch('/nivel', axiosPrivate)
    
    const postulacion = data.find(obj => obj._id === id)
    const nombre = postulacion.datos_docente.nombre + " " + postulacion.datos_docente.apellido
    const cuil = postulacion.datos_docente.cuil

    
    let nivelesCompletos = []
    let categoriasCompletas = []

    if(data && categoriaData && nivelesData){
        
            categoriasCompletas = postulacion.categorias.map((cat) => {
                const categoria = categoriaData.categoria.find((c) => c._id === cat._id);
                return categoria ? categoria : undefined;
            });

            if(postulacion.niveles.length > 0){
                nivelesCompletos = postulacion.niveles.map((niv) => {
                    const nivel = nivelesData.nivel.find((n) => n._id === niv._id);
                    return nivel ? nivel : undefined;
                });
            }
    }

    const establecimientoData = useAxiosFetch('/establecimiento/id/'+ postulacion.sede, axiosPrivate)
    
    let nombreSede;

    if (establecimientoData.data) {
        nombreSede = establecimientoData.data.establecimiento.nombre;
    }

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
    
    const show = categoriaData && nivelesData && establecimientoData.data && fileURL !== ''

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

    return (
        <Card title="Visualizar Postulante" header={<PostulanteHeader title={nombre} subtitle={formatCuil(cuil)}/>}>
            <div>
                {!show  ? 
                    <Spinner/> 
                    : 
                    <DatosPostulante 
                        sede={capitalizeEachLetter(nombreSede)} 
                        cargo={postulacion.datos_docente.cargo} 
                        niveles={nivelesCompletos}
                        categorias={categoriasCompletas} 
                        antecedentes={postulacion.antecedentes}
                        handleDownload={handleDownload}
                    />
                }
            </div>
        </Card>    
        
    );
}

export default VisualizarPostulante;