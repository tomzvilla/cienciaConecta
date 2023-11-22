import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

// const labels = ['Lengua', 'Matematica', 'Cs Naturales', 'Cs Sociales', 'Robotica', 'Educacion Fisica'];
const labels = ['Calamuchita', 'Capital', 'Colon', 'Cruz del Eje', 'General Roca', 'Ischilin'];

const data = {
    labels,
    datasets: [
        {
            label: 'Proyectos aprobados',
            data: [10, 20, 30, 25, 30, 12],
            backgroundColor: 'rgb(97, 255, 102)'
        },
        {
            label: 'Proyectos NO aprobados',
            data: [5, 10, 15, 12, 15, 6],
            backgroundColor: 'rgb(252, 82, 76)'
        },
    ]

}

const Grafico = () => {
    return <Bar options={options} data={data} />;
}

export default Grafico