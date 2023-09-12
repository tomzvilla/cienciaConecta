// components
import Spinner from "../../components/Spinner/Spinner"
import TablaPostulantes from "../../components/TablaPostulantes/TablaPostulantes"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const headers = [
    {name: 'Nombre', value: 'nombre'},
    {name: 'Apellido', value: 'apellido'},
    {name: 'CUIL', value: 'cuil'},
    {name: 'Niveles', value: 'niveles'},
    {name: 'Categorías', value: 'categorias'},
]

const SeleccionPostulantes = () => {

    const axiosPrivate = useAxiosPrivate()

    let postulaciones = []
    let categoria = []
    const {data} = useAxiosFetch('/evaluador/postulaciones', axiosPrivate)
    const {data: categoriaData} = useAxiosFetch('/categoria', axiosPrivate)

    if(data && categoriaData){
        postulaciones = data.postulaciones.map(p => {
            const nombre = p.datos_docente.nombre
            const apellido = p.datos_docente.apellido
            const cuil = p.datos_docente.cuil
            const categoriasCompletas = p.categorias.map((categoriaId) => {
                const categoria = categoriaData.categoria.find((c) => c._id === categoriaId);
                console.log(categoriaData.categoria)
                return categoria ? categoria : undefined;
            });
            return {
                ...p,
                nombre: nombre,
                apellido: apellido,
                cuil: cuil,
                categorias: categoriasCompletas,
            }
        })
        console.log(postulaciones)
    }

    return(
        <div>
            <h2>Selecciona los postulantes que serán evaluadores durante la feria</h2>
            {!data || !categoriaData ? 
                <Spinner/> 
                : 
                <TablaPostulantes categorias={categoriaData.categoria} data={postulaciones} headers={headers}/>
            }
        </div>
    )

}

export default SeleccionPostulantes