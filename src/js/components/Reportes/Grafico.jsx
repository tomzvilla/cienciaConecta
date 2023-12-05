import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import Mapa from './Mapa';
import Button from '../Button/Button';
import { useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
);

const Grafico = (props) => {
    const dataReporte = useSelector(state => state.reportes.data).data
    const backgroundColor = props.grafico === 'barras' ? 'rgba(0, 172, 230, 0.8)' : dataReporte.datasets?.backgroundColor

    const data = {
        labels: dataReporte?.labels,
        datasets: [
            {
                label: dataReporte.datasets?.label,
                data: dataReporte.datasets?.data,
                backgroundColor,
            }
          
        ]
    }

    const titulo = dataReporte.datasets.label
    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: titulo,
          },
        },
    };

    return (
        <div className='reportes'>
            {props.filtro?._id === 'departamento' ?
            <Mapa datasets={data}/>
            :
            props.reporte?._id === 'cantidadProyectosFeria' ?
            <Line options={options} data={data} className='div2PDF' />
            :
            props.grafico === 'barras' ?
            <Bar options={options} data={data} className='div2PDF'/>
            :
            props.grafico === 'pastel' ?
            <Pie data={data} options={options} className='div2PDF'/>
            :
            null
            }
            <div className='reportes__button'>
              <Button 
                text='Agregar a listado' 
                onClickHandler={() => props.handleAddReport(titulo)}
                activo={true}
              />

            </div>
            
        </div>

    )
    
}

export default Grafico