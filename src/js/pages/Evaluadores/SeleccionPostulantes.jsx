// components
import Spinner from "../../components/Spinner/Spinner"
import TablaPostulantes from "../../components/TablaPostulantes/TablaPostulantes"
import BlankState from "../../components/BlankState/BlankState"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useLocation } from "react-router-dom"

// state
import { postulacionesActions } from "../../../store/postulaciones-slice"
import { useDispatch } from "react-redux"

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
    const dispatch = useDispatch()

    let postulaciones = []
    const {data, isLoading} = useAxiosFetch('/evaluador/postulaciones', axiosPrivate)
    const {data: categoriaData} = useAxiosFetch('/categoria', axiosPrivate)
    const {data: nivelesData} = useAxiosFetch('/nivel', axiosPrivate)

    if(!isLoading && categoriaData && nivelesData){
        console.log('Entro al data')
        postulaciones = data?.postulaciones?.map(p => {
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

        dispatch(postulacionesActions.cargarPostulaciones(postulaciones))
    }

    return(
        <div>
            <h2>Selecciona los postulantes que serán evaluadores durante la feria</h2>
            {isLoading || !categoriaData || !nivelesData ? 
                <Spinner/> 
                : !postulaciones ?
                <BlankState msg={"Actualmente no hay ninguna postulación. Vuelva más tarde."} />
                :
                <TablaPostulantes location={location} headers={headers}/>
            }
        </div>
    )

}

export default SeleccionPostulantes