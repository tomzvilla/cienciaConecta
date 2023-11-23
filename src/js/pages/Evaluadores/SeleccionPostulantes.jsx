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
import useUtils from "../../hooks/useUtils"
// state
import { postulacionesActions } from "../../../store/postulaciones-slice"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"



const SeleccionPostulantes = () => {

    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [resize, setResize] = useState(window.innerWidth <= 1200);
    const { formatDate } = useUtils()
    const feria = useSelector(state => state.instancias.feria)
    const fecha = new Date()

    let postulacionesListado = []
    const {data, isLoading} = useAxiosFetch('/evaluador/postulaciones', axiosPrivate)
    const {data: categoriaData} = useAxiosFetch('/categoria', axiosPrivate)
    const {data: nivelesData} = useAxiosFetch('/nivel', axiosPrivate)

    const headers = !resize ? [
        {name: 'Nombre', value: 'nombre'},
        {name: 'Apellido', value: 'apellido'},
        {name: 'Niveles', value: 'niveles'},
        {name: 'Categorías', value: 'categorias'},
    ] : [
        {name: 'Nombre', value: 'nombre'},
        {name: 'Apellido', value: 'apellido'},
    ];

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

    const handleResize = () => {
        setResize(window.innerWidth <= 1200);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <>
            <Metadata title={'Seleccionar Postulantes'}/>
            <div className="table-custom-page">
                <Card title="Lista de Postulantes" wide={true}>
                        {isLoading || !categoriaData || !nivelesData ? 
                        <Spinner/> 
                        :
                        fecha >= new Date(feria?.fechas_evaluador.fechaInicioPostulacionEvaluadores) && fecha <= new Date(feria?.fechas_evaluador.fechaInicioAsignacionProyectos) ?
                        <>
                            {!postulacionesListado ?
                            <BlankState msg="Actualmente no hay ninguna postulación, ¡Intentá de nuevo mas tarde!" /> 
                            :
                            <>
                                <h6 className="table-custom-page__text">Seleccioná los postulantes que serán evaluadores durante la feria</h6>
                                <TablaPostulantes  resize={resize} location={location} headers={headers} viewPath={'/postulante'}/>
                            </>
                            }
                        </>
                        :
                        fecha <= new Date(feria?.fechas_evaluador.fechaInicioPostulacionEvaluadores) ?
                        <BlankState msg={`Todavía no llego la fecha de postulación, por favor esperá hasta el ${formatDate(new Date(feria?.fechas_evaluador.fechaInicioPostulacionEvaluadores))}`}/>
                        :
                        <BlankState msg={'La fecha de seleccionar postulantes a evaluador expiró.'}/>
                        }
                </Card>
            </div>
        </>

    )

}

export default SeleccionPostulantes