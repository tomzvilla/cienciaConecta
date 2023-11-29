// components
import FiltroReportes from "../../components/Reportes/FiltroReportes"
import Spinner from "../../components/Spinner/Spinner"
import Card from "../../components/Card/Card"
import BlankState from '../../components/BlankState/BlankState'
import Grafico from "../../components/Reportes/Grafico"
import Button from "../../components/Button/Button"
import TablaReportes from "../../components/Reportes/TablaReportes"
// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { reportesActions } from "../../../store/reportes-slice"
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";

const reportes = [
    {nombre: '', _id: ''},
    {nombre: 'Cantidad de proyectos aprobados', _id: 'cantidadProyectosAprobados'},
    {nombre: 'Cantidad de proyectos desaprobados', _id: 'cantidadProyectosDesaprobados'},
    {nombre: 'Porcentaje de proyectos aprobados', _id: 'porcProyectosAprobados'},
    {nombre: 'Cantidad de proyectos inscriptos', _id: 'cantidadProyectosInscriptos'},
    {nombre: 'Porcentaje de proyectos inscriptos', _id: 'porcProyectosInscriptos'},
    {nombre: 'Puntaje promedio', _id: 'puntajePromedio'},
    {nombre: 'Cantidad de evaluadores por departamento', _id: 'cantidadEvaluadores'},
    {nombre: 'Cantidad de proyectos inscriptos en cada feria', _id: 'cantidadProyectosFeria'},
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

const notFiltros = ['cantidadEvaluadores', 'cantidadProyectosFeria']
const notFerias = ['cantidadProyectosFeria']
const notGraficos = ['cantidadProyectosFeria', 'cantidadEvaluadores']

const Reportes = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const loadingReporte = useSelector(state => state.reportes.loadingReporte)
    const listadoReportes = useSelector(state => state.reportes.listadoReportes)
    const [reports, setReports] = useState([]);
    const [pdf, setPdf] = useState(new jsPDF('p', 'px', 'a4'));

    const { data: feriaData, isLoading } = useAxiosFetch('/feria', axiosPrivate)

    const [searchState, setSearchState] = useState({
        reporteSeleccionado: '',
        filtroSeleccionado: '',
        feriaSeleccionada: '',
        graficoSeleccionado: '',
    })

    const [reporteBuscado, setReporteBuscado] = useState({
        reporte: '',
        filtro: '',
        feria: '',
        grafico: '',
    })

    const [buscaronReporte, setBuscaronReporte] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target
        const nextFormValueState = {
            ...searchState,
            [name]: value
        }
        setSearchState(nextFormValueState)

    }

    let ferias = []

    if(!isLoading) {
        ferias = feriaData.ferias.map(f => {return {nombre: f.nombre, _id: f._id}})
        ferias.unshift({nombre: '', _id: ''})
        ferias.push({nombre: 'Todas', _id: 'all'})
    }

    const getEndpoint = () => {
        let endpoint = '/reportes/' + searchState.reporteSeleccionado + '?'
        if(searchState.filtroSeleccionado !== '' && !notFiltros.includes(searchState.reporteSeleccionado)) {
            endpoint += `&filtro=${searchState.filtroSeleccionado}`
        }
        if(searchState.feriaSeleccionada !== '' && searchState.feriaSeleccionada !== 'all') {
            endpoint += `&feria=${searchState.feriaSeleccionada}`
        }
        console.log(searchState.reporteSeleccionado)
        if(searchState.reporteSeleccionado === 'cantidadProyectosAprobados' || searchState.reporteSeleccionado === 'cantidadProyectosDesaprobados' || searchState.reporteSeleccionado === 'porcProyectosAprobados' ) {
            endpoint += '&puntaje=100'
        }
        return endpoint

    }

    const obtenerReporte = async () => {


        if(!searchState.reporteSeleccionado) return

        if(!notFiltros.includes(searchState.reporteSeleccionado) && !searchState.filtroSeleccionado) return
        if(!notGraficos.includes(searchState.reporteSeleccionado) && searchState.filtroSeleccionado !== 'departamento' && !searchState.graficoSeleccionado) return
        if(!notFerias.includes(searchState.reporteSeleccionado) && !searchState.feriaSeleccionada) return

        const endpoint = getEndpoint()

        try {
            dispatch(reportesActions.setLoadingReporte(true))
            setBuscaronReporte(true)
            setReporteBuscado({})
            const { data: reporteData } = await axiosPrivate.get(endpoint, axiosPrivate)

            setReporteBuscado({
                reporte: searchState.reporteSeleccionado,
                feria: searchState.feriaSeleccionada,
                grafico: searchState.graficoSeleccionado,
                filtro: searchState.filtroSeleccionado,
            })
            setSearchState({
                ...searchState,
                filtroSeleccionado: '',
                feriaSeleccionada: '',
                graficoSeleccionado: '',  
            })
            dispatch(reportesActions.setData(reporteData))

            dispatch(reportesActions.setLoadingReporte(false))
            return true
        } catch (err) {
            console.log(err)
        }

    }

    const handleAddReport = async (titulo) => {
        div2pdf()
        dispatch(reportesActions.agregarReporte({titulo: titulo}))
    }

    const handleRemoveReport = (titulo, index) => {
        console.log(index)
        dispatch(reportesActions.borrarReporte({titulo: titulo}))
        setPdf((prevPdf) => {
            prevPdf.deletePage(index + 1); // Suma 1 porque las páginas en jsPDF comienzan desde 1
            return prevPdf;
        });
    }

    const div2pdf = () => {
        let input = window.document.getElementsByClassName("div2PDF")[0];
        html2canvas(input)
            .then(canvas => {
            const img = canvas.toDataURL("image/png");

            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
        
            const widthRatio = pageWidth / canvas.width;
            const heightRatio = pageHeight / canvas.height;
            const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
        
            const canvasWidth = canvas.width * ratio;
            const canvasHeight = canvas.height * ratio;
        
            const marginX = (pageWidth - canvasWidth) / 2;
            const marginY = (pageHeight - canvasHeight) / 2;
            
            setPdf((prevPdf) => {
                if(listadoReportes.length !== 0) pdf.addPage();
                prevPdf.addImage(img, 'svg', marginX, marginY, canvasWidth, canvasHeight);
                return prevPdf;
            });
            // pdf.save("chart.pdf");
        }).catch(err => console.log(err))
    }

    const imprimirPdf = () => {
        pdf.save("informe.pdf");
    }

    return(
        <Card title={'Reportes'}>
            {
                isLoading ?
                <Spinner />
                :
                <>
                    <FiltroReportes searchState={searchState} reporteSeleccionado={searchState.reporteSeleccionado} filtros={filtros} reportes={reportes} ferias={ferias} graficos={graficos} handleChange={handleChange}/>
                    <div className="button-container">
                        <Button 
                            text='Ver' 
                            onClickHandler={() => obtenerReporte()}
                            activo={true}
                        />
                    </div>
                    {!buscaronReporte ?
                    <BlankState msg={'Ingrese un reporte, un filtro y una feria para generar un informe.'} />
                    :
                    loadingReporte ?
                    <Spinner />
                    :
                    <Grafico
                        filtro={filtros.find((el) => el._id === reporteBuscado.filtro)}
                        reporte={reportes.find((el) => el._id === reporteBuscado.reporte)}
                        feria={ferias.find((el) => el._id === reporteBuscado.feria)}
                        grafico={reporteBuscado.grafico}
                        handleAddReport={handleAddReport}
                    />
                    }
                    {listadoReportes.length !== 0 && <TablaReportes imprimirPdf={imprimirPdf} handleRemoveReport={handleRemoveReport} />}
                </>
            }
        </Card>
    )

}

export default Reportes