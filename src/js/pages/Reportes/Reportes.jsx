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
import { jsPDF } from 'jspdf';
import html2canvas from "html2canvas";

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

// TODO ESTO DEBE VENIR DEL BACK

const labelList = {
    categoria: ['Lengua', 'Matematica', 'Cs Naturales', 'Cs Sociales', 'Robotica', 'Educacion Fisica', 'Lengua', 'Matematica', 'Cs Naturales', 'Cs Sociales', 'Robotica', 'Educacion Fisica'],
    departamento: ['PRESIDENTE ROQUE SAENZ PEÑA', 'TERCERO ARRIBA', 'JUAREZ CELMAN', 'SOBREMONTE', 'TULUMBA', 'ISCHILIN', 'TOTORAL', 'CRUZ DEL EJE', 'COLON', 
    'PUNILLA', 'CAPITAL', 'GENERAL SAN MARTIN', 'SANTA MARIA', 'MINAS', 'POCHO', 'SAN ALBERTO', 'SAN JAVIER', 'RIO SEGUNDO', 'SAN JUSTO', 'UNION', 'RIO PRIMERO',
    'MARCOS JUAREZ', 'RIO CUARTO','GENERAL ROCA', 'CALAMUCHITA','RIO SECO'],
    nivel: ['Inicial', 'Primario A', 'Primario B', 'Secundario A', 'Secundario B', 'Superior'],
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }

const Reportes = () => {

    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const loadingReporte = useSelector(state => state.reportes.loadingReporte)
    const [reports, setReports] = useState([]);

    const { data: feriaData, isLoading } = useAxiosFetch('/feria', axiosPrivate)

    const [searchState, setSearchState] = useState({
        reporteSeleccionado: '',
        filtroSeleccionado: '',
        feriaSeleccionada: '',
        graficoSeleccionado: '',
    })

    
    const data = {
        labels: labelList[searchState.filtroSeleccionado],
        datasets: [
            {
                label: 'Proyectos aprobados',
                //data: [getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100)],
                data: [getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), 
                    getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100),
                    getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100),
                    getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100),
                    getRandomInt(10, 100), getRandomInt(10, 100)],
                backgroundColor: ['rgba(0, 172, 230, 0.7)'],
                borderColor: 'rgb(53, 162, 235)',
                fill: true
            }
        ]
    }

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

    const handleAddReport = () => {
        obtenerReporte(searchState.reporteSeleccionado, searchState.filtroSeleccionado, searchState.feriaSeleccionada, searchState.graficoSeleccionado)
        setReports(prevReports => [...prevReports, data]);
    }

    const div2pdf = () => {
        let input = window.document.getElementsByClassName("div2PDF")[0];

        html2canvas(input)
            .then(canvas => {
            const img = canvas.toDataURL("image/png");
            console.log(img)
            const pdf = new jsPDF('p', 'px', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
        
            const widthRatio = pageWidth / canvas.width;
            const heightRatio = pageHeight / canvas.height;
            const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
        
            const canvasWidth = canvas.width * ratio;
            const canvasHeight = canvas.height * ratio;
        
            const marginX = (pageWidth - canvasWidth) / 2;
            const marginY = (pageHeight - canvasHeight) / 2;
            pdf.addImage(img, 'svg', marginX, marginY, canvasWidth, canvasHeight);
            pdf.save("chart.pdf");
        }).catch(err => console.log(err))
    }

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
                            onClickHandler={handleAddReport}
                            activo={true}
                        />
                        <Button 
                            text='Imprimir' 
                            onClickHandler={div2pdf}
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
                        data={data}
                    />
                    }
                </>

            
            }

        </Card>
    )

}

export default Reportes