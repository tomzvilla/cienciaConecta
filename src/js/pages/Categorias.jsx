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
import { useEffect, useState } from "react"

const Categorias = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()

    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate)
    const [resize, setResize] = useState(window.innerWidth <= 600);
    const { categorias } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: null, enabled: !loadingCategorias })

    if(!loadingCategorias && categorias) {
        dispatch(categoriasActions.cargarCategorias(categorias))
    }

    const headers = !resize ? [
        {name: 'Categoría', value: 'nombre'},
        {name: 'Abreviatura', value: 'abreviatura'},
        {name: 'Badge', value: 'badge'},
    ] : [
        {name: 'Categoría', value: 'nombre'},
        {name: 'Abreviatura', value: 'abreviatura'},
    ]

    const handleResize = () => {
        setResize(window.innerWidth <= 600);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);
    
    return (
        <Card title={'Agregar categorias'}>
            
                {
                    loadingCategorias ?
                    <Spinner />
                    :
                    categorias.length > 0 ?
                    <div className="categoria-form">
                        <CrearCategorias/>
                        <TablaCategorias headers={headers}/>
                    </div>
                    :
                    <BlankState msg={'No hay categorías cargadas para la feria actual'}/>
                }
            
        </Card>
    )

}

export default Categorias
