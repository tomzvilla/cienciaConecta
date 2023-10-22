// components
import CrearCategorias from "../components/CrearCategorias/CrearCategorias"
import Card from "../components/Card/Card"
import TablaCategorias from "../components/CrearCategorias/TablaCategorias"
import Spinner from "../components/Spinner/Spinner"
import BlankState from "../components/BlankState/BlankState"
// hooks 
import useAxiosFetch from "../hooks/useAxiosFetch"
import useAxiosPrivate from "../hooks/useAxiosPrivate"
import useCategoriasNiveles from "../hooks/useCategoriasNiveles"
import { categoriasActions } from "../../store/categorias-slice"
import { useDispatch } from "react-redux"

const headers = [
    {name: 'Categoría', value: 'nombre'},
    {name: 'Abreviatura', value: 'abreviatura'},
    {name: 'Badge', value: 'badge'},
]

const Categorias = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()

    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)

    const { categorias } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: null, enabled: !loadingCategorias })

    if(!loadingCategorias && categorias) {
        dispatch(categoriasActions.cargarCategorias(categorias))
    }
    
    return (
        <Card title={'Agregar categorias'}>
            <div className="postulacion-form">
                <CrearCategorias/>
                {
                    loadingCategorias ?
                    <Spinner />
                    :
                    categorias.length > 0 ?
                    <TablaCategorias headers={headers}/>
                    :
                    <BlankState msg={'No hay categorías cargadas para la feria actual'}/>
                }
            </div>
        </Card>
    )

}

export default Categorias
