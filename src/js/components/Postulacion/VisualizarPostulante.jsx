import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useParams } from "react-router"
import Card from "../Card/Card"
import Badge from "../Badge/Badge"
import Spinner from "../../components/Spinner/Spinner"
import GenericBadge from "../Badge/GenericBadge"
import { useSelector } from "react-redux"

const roles = ['Referente de Evaluador', 'Evaluador', 'Responsable de Proyecto'] // 1=Referente, 2=Evaluador, 3=Responsable

const VisualizarPostulante = (props) => {
    const axiosPrivate = useAxiosPrivate()


    //const postulacioes = useSelector(state => state.postulaciones.listadoPostulantes)

    console.log(postulacioes)

    let postulaciones = []
    let categoria = []
    const { id } = useParams()
    const {data} = useAxiosFetch('/evaluador/postulaciones', axiosPrivate)
    const {data: categoriaData} = useAxiosFetch('/categoria', axiosPrivate)
    const {data: nivelesData} = useAxiosFetch('/nivel', axiosPrivate)
    

    let postulacion, nombre, cuil;
    let nivelesCompletos = []
    let categoriasCompletas = []

    if(data && categoriaData && nivelesData){

        postulacion = data.postulaciones.find(obj => obj._id === id)


            nombre = postulacion.datos_docente.nombre + " " + postulacion.datos_docente.apellido
            cuil = postulacion.datos_docente.cuil

            categoriasCompletas = postulacion.categorias.map((categoriaId) => {
                const categoria = categoriaData.categoria.find((c) => c._id === categoriaId);
                return categoria ? categoria : undefined;
            });
            if(postulacion.niveles.length > 0){
                nivelesCompletos = postulacion.niveles.map((nivelId) => {
                    const nivel = nivelesData.nivel.find((n) => n._id === nivelId);
                    return nivel ? nivel : undefined;
                });
            }


            //const sede = useAxiosFetch('/establecimiento/id/'+postulacion.sede, axiosPrivate)
            
    
    }

    return (
        <Card title="Visualizar Postulante">
            <div>
                {!data  ? 
                    <Spinner/> 
                    : 
                    <>
                        <p>Nombre: {nombre}</p>
                        <p>Cargo: {postulacion.datos_docente.cargo}</p>
                        <p>Sede: {postulacion.sede}</p>
                        <div>
                            Niveles: {nivelesCompletos.map( n => (<Badge  key={n._id} type={n} />)
                                                        )}
                        </div>

                        <div>
                            Categorías: {categoriasCompletas.map( c => (<Badge  key={c._id} type={c} />)
                                                        )}
                        </div>

                        <div>
                            Antecedentes: {postulacion.antecedentes.map( a => (<GenericBadge key={a._id} text={a.year + " - " + roles[a.rol-1]}/>)
                                                        )}
                        </div>
                        
                    
                    </>
                    
                }
            
                
            </div>


        </Card>    
        
    );
}

export default VisualizarPostulante;