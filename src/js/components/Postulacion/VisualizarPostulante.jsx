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

const VisualizarPostulante = (props) => {
    const axiosPrivate = useAxiosPrivate()
    const { id } = useParams()
    const { formatCuil } = useUtils()

    

    let postulacion = useSelector(state => state.postulaciones.listadoPostulantes)?.find(obj => obj._id === id)
    let nombre = postulacion?.datos_docente ? postulacion?.datos_docente?.nombre + " " + postulacion?.datos_docente?.apellido : 'Cargando...'
    let cuil = postulacion?.datos_docente ? formatCuil(postulacion?.datos_docente?.cuil) : ''

    const {data: categoriaData, isLoading: loadingCategorias} = useAxiosFetch('/categoria', axiosPrivate, !!postulacion)
    const {data: nivelesData, isLoading: loadingNiveles} = useAxiosFetch('/nivel', axiosPrivate, !!postulacion)
    const {data: postulacionData } = useAxiosFetch(`/evaluador/postulaciones/${id}`, axiosPrivate, !!postulacion)

    const { evaluadorMap } = useCategoriasNiveles({ categoriaData: categoriaData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles })

    if(postulacionData && categoriaData && nivelesData) {
      postulacion = evaluadorMap(postulacionData.postulacion)
      nombre = postulacion?.datos_docente?.nombre + " " + postulacion?.datos_docente?.apellido ?? 'Cargando...'
      cuil = postulacion?.datos_docente?.cuil ?? 'Cargando...'
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
                    />
                }
            </div>
        </Card>    
        
    );
}

export default VisualizarPostulante;