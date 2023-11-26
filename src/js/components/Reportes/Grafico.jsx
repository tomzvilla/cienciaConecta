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


const labelList = {
    categoria: ['Lengua', 'Matematica', 'Cs Naturales', 'Cs Sociales', 'Robotica', 'Educacion Fisica'],
    departamento: ['Calamuchita', 'Capital', 'Colon', 'Cruz del Eje', 'General Roca', 'Ischilin'],
    nivel: ['Inicial', 'Primario A', 'Primario B', 'Secundario A', 'Secundario B', 'Superior'],
}

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  }


const Grafico = (props) => {


    const data = {
        labels: labelList[props.filtro._id],
        datasets: [
            {
                label: 'Proyectos aprobados',
                data: [getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100)],
                backgroundColor: ['rgba(0, 172, 230, 0.7)'],
                borderColor: 'rgb(53, 162, 235)',
                fill: true
            },
        //     {
        //         label: 'Proyectos desaprobados',
        //         data: [getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100), getRandomInt(10, 100)],
        //         backgroundColor: ['rgb(245, 96, 66)']
        //     }
        ]
    }

    const titulo = props.reporte.nombre + ' por ' + props.filtro.nombre
    const options = {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: titulo,
          },
        },
    };

    console.log(props.grafico)

    return (
        props.reporte._id === 'cantProyectos' ?
        <Line options={options} data={data} />
        :
        props.grafico === 'barras' ?
        <Bar options={options} data={data} />
        :
        props.grafico === 'pastel' ?
        <Pie data={data} options={options} />
        :
        null
    )
    
}

export default Grafico