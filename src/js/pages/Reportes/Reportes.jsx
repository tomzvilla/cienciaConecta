// components
import FiltroReportes from "../../components/Reportes/FiltroReportes"
import Spinner from "../../components/Spinner/Spinner"
import Card from "../../components/Card/Card"
import BlankState from '../../components/BlankState/BlankState'
import Grafico from "../../components/Reportes/Grafico"
import Button from "../../components/Button/Button"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { reportesActions } from "../../../store/reportes-slice"

const reportes = [
    {nombre: '', _id: ''},
    {nombre: 'Cantidad de proyectos aprobados', _id: 'cantProyectosAprobados'},
    {nombre: 'Cantidad de proyectos desaprobados', _id: 'cantProyectosDesaprobados'},
    {nombre: 'Porcentaje de proyectos aprobados', _id: 'porcentajeProyectosAprobados'},
    {nombre: 'Cantidad de proyectos inscriptos', _id: 'cantProyectosInscriptos'},
    {nombre: 'Porcentaje de proyectos inscriptos', _id: 'porcentajeProyectosInscriptos'},
    {nombre: 'Puntaje promedio', _id: 'puntajePromedio'},
    {nombre: 'Cantidad de evaluadores por departamento', _id: 'cantEvaluadores'},
    {nombre: 'Cantidad de proyectos inscriptos en cada feria', _id: 'cantProyectos'},
]

const filtros = [
    {nombre: '', _id: ''},
    {nombre: 'Categoría', _id: 'categoria'},
    {nombre: 'Nivel', _id: 'nivel'},
    {nombre: 'Departamento', _id: 'departamento'},
]

const graficos = [
    {nombre: '', _id: ''},
    {nombre: 'Barras', _id: 'barras'},
    {nombre: 'Pastel', _id: 'pastel'},
]

const notFiltros = ['cantEvaluadores', 'cantProyectos']
const notFerias = ['cantProyectos']
const notGraficos = ['cantProyectos']

const Reportes = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const loadingReporte = useSelector(state => state.reportes.loadingReporte)

    const { data, isLoading } = useAxiosFetch('/feria', axiosPrivate)

    const [searchState, setSearchState] = useState({
        reporteSeleccionado: '',
        filtroSeleccionado: '',
        feriaSeleccionada: '',
        graficoSeleccionado: '',
    })

    const [buscaronReporte, setBuscaronReporte] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(e.target.selectedOptions[0].getAttribute("name"))
        const nextFormValueState = {
            ...searchState,
            [name]: value
        }
        setSearchState(nextFormValueState)

    }

    let ferias = []

    if(!isLoading) {
        ferias = data.ferias.map(f => {return {nombre: f.nombre, _id: f._id}})
        ferias.unshift({nombre: '', _id: ''})
    }

    const obtenerReporte = async (reporte, filtro, feria, grafico) => {

        if(!reporte) return

        if(!notFiltros.includes(reporte) && !filtro) return
        if(!notGraficos.includes(reporte) && !grafico) return
        if(!notFerias.includes(reporte) && !feria) return

        try {
            dispatch(reportesActions.setLoadingReporte(true))
            setBuscaronReporte(true)
            // TODO, consulta para obtener el reporte

            dispatch(reportesActions.setLoadingReporte(false))
        } catch (err) {
            console.log(err)
        }

    }

    console.log(searchState)

    return(
        <Card title={'Reportes'}>
            {
                isLoading ?
                <Spinner />
                :
                <>
                    <FiltroReportes reporteSeleccionado={searchState.reporteSeleccionado} filtros={filtros} reportes={reportes} ferias={ferias} graficos={graficos} handleChange={handleChange}/>
                    <div className="button-container">
                        <Button 
                            text='Ver' 
                            onClickHandler={() => obtenerReporte(searchState.reporteSeleccionado, searchState.filtroSeleccionado, searchState.feriaSeleccionada, searchState.graficoSeleccionado)}
                            activo={true}
                        />
                        <Button 
                            text='Agregar a listado' 
                            onClickHandler={() => {}}
                            activo={true}
                        />

                    </div>
                    {!buscaronReporte ?
                    <BlankState msg={'Ingrese un reporte, un filtro y una feria para generar un informe.'} />
                    :
                    <Grafico
                        filtro={filtros.find((el) => el._id === searchState.filtroSeleccionado)}
                        reporte={reportes.find((el) => el._id === searchState.reporteSeleccionado)}
                        feria={ferias.find((el) => el._id === searchState.feriaSeleccionada)}
                        grafico={searchState.graficoSeleccionado}
                        data={'aca pasar resultado de consulta'}
                    />
                    }
                </>

            
            }

        </Card>
    )

}

export default Reportes