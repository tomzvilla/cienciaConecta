// components
import Card from "../../components/Card/Card"
import Spinner from "../../components/Spinner/Spinner"
import TablaPostulantes from "../../components/TablaPostulantes/TablaPostulantes"
import BlankState from "../../components/BlankState/BlankState"
import Metadata from "../../components/Metadata/Metadata"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useLocation } from "react-router-dom"

// state
import { postulacionesActions } from "../../../store/postulaciones-slice"
import { useDispatch, useSelector } from "react-redux"

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

    let postulacionesListado = []
    const {data, isLoading} = useAxiosFetch('/evaluador/postulaciones', axiosPrivate)
    const {data: categoriaData} = useAxiosFetch('/categoria', axiosPrivate)
    const {data: nivelesData} = useAxiosFetch('/nivel', axiosPrivate)

    if(!isLoading && categoriaData && nivelesData) {
        postulacionesListado = data?.postulaciones?.map(p => {

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
        }).sort((a, b) => {
            return new Date(b.fechaPostulacion) - new Date(a.fechaPostulacion)
        })

        dispatch(postulacionesActions.cargarPostulaciones(postulacionesListado))
    }

    return (
        <>
            <Metadata title={'Seleccionar Postulantes'}/>
            <div className="table-custom-page">
                <Card title="Lista de Postulantes" wide={true}>
                    
                        <h6 className="table-custom-page__text">Seleccioná los postulantes que serán evaluadores durante la feria</h6>

                        {isLoading || !categoriaData || !nivelesData ? 
                        <Spinner/> 
                        : !postulacionesListado ?
                        <BlankState msg={"Actualmente no hay ninguna postulación. Vuelva más tarde."} /> :
                        <TablaPostulantes location={location} headers={headers} viewPath={'/postulante'}/>
                        }
                </Card>
            </div>
        </>

    )

}

export default SeleccionPostulantes