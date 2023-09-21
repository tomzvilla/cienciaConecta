// components
import Card from "../../components/Card/Card"
import Spinner from "../../components/Spinner/Spinner"
import TablaPostulantes from "../../components/TablaPostulantes/TablaPostulantes"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useLocation } from "react-router-dom"

const headers = [
    {name: 'Nombre', value: 'nombre'},
    {name: 'Apellido', value: 'apellido'},
    {name: 'CUIL', value: 'cuil'},
    {name: 'Niveles', value: 'niveles'},
    {name: 'Categorías', value: 'categorias'},
]

const SeleccionPostulantes = () => {

    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()

    let postulaciones = []
    let categoria = []
    const {data} = useAxiosFetch('/evaluador/postulaciones', axiosPrivate)
    const {data: categoriaData} = useAxiosFetch('/categoria', axiosPrivate)
    const {data: nivelesData} = useAxiosFetch('/nivel', axiosPrivate)

    if(data && categoriaData && nivelesData){
        postulaciones = data.postulaciones.map(p => {
            const nombre = p.datos_docente.nombre
            const apellido = p.datos_docente.apellido
            const cuil = p.datos_docente.cuil
            const categoriasCompletas = p.categorias.map((categoriaId) => {
                const categoria = categoriaData.categoria.find((c) => c._id === categoriaId);
                return categoria ? categoria : undefined;
            });
            let nivelesCompletos = []
            if(p.niveles.length > 0){
                nivelesCompletos = p.niveles.map((nivelId) => {
                    const nivel = nivelesData.nivel.find((n) => n._id === nivelId);
                    return nivel ? nivel : undefined;
                });
            }
            
            return {
                ...p,
                nombre: nombre,
                apellido: apellido,
                cuil: cuil,
                categorias: categoriasCompletas,
                niveles: nivelesCompletos,
            }
        })
    }

    return(
        <div className="seleccion-postulantes">
            <Card title="Lista de Postulantes">
                
                    <h6 className="seleccion-postulantes__text">Seleccioná los postulantes que serán evaluadores durante la feria</h6>

                    {!data || !categoriaData ? 
                    <Spinner/> 
                    : 
                    <TablaPostulantes location={location} data={postulaciones} headers={headers} viewPath={'/postulante'}/>
                }


                
                
                
            </Card>
        </div>
    )

}

export default SeleccionPostulantes