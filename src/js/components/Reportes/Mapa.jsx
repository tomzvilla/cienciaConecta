import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dptos from './dptos.json'
import MapaLeyenda from './MapaLeyenda';

const Mapa = (props) => {

    const mapStyle = {
        height: '60vh',
        width: '80%',
        margin: '0 auto',
    }

    const minNumber = Math.min(...props.datasets?.datasets[0]?.data);
    const maxNumber = Math.max(...props.datasets?.datasets[0]?.data);

    // Calcula el tamaño del intervalo redondeando hacia arriba
    const intervalSize = Math.ceil((maxNumber - minNumber) / 5);

    // Define los intervalos y asigna colores
    const getInterval = (number) => {
        for (let i = 0; i < 5; i++) {
            const startRange = minNumber + i * intervalSize;
            const endRange = startRange + intervalSize;

            if (number >= startRange && number <= endRange) {
                return i;
            }
        }
    }

    const getIntervals = () => {
        const intervals = Array.from({ length: 5 }, (_, i) => {
            const startRange = minNumber + i * intervalSize;
            const endRange = startRange + intervalSize;
    
            return {
                interval: i,
                start: startRange,
                end: endRange,
                values: props.datasets?.datasets[0]?.data.filter(value => value >= startRange && value <= endRange),
            };
        });
    
        return intervals;
    };

    const allIntervals = getIntervals()

    // Función para estilizar las capas GeoJSON según el número de proyectos
    const style = (feature) => {
        const featureDataIndex = props?.datasets?.labels?.findIndex(el => el.toUpperCase() === feature.properties.departamento)

        //const value = parseInt(props?.datasets?.datasets[0]?.data[featureDataIndex])/totalCount ?? 0
        const interval = getInterval(parseInt(props?.datasets?.datasets[0]?.data[featureDataIndex]) ?? 0)

        return {
            fillColor: getColor(interval),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
        };
    };
  
    // Función para obtener el color según el número de proyectos
    const getColor = (interval) => {
        const colors = ['#b3e6f8', '#80d6f3', '#4dc5ee', '#33bdeb', '#00ace6']
        return colors[interval]
    };
    

    // Función para mostrar información emergente en clic del departamento
    const onEachFeature = (feature, layer) => {
        const featureDataIndex = props?.datasets?.labels?.findIndex(el => el.toUpperCase() === feature.properties.departamento)
        const popupContent = `
        <div style="font-size: 16px;">Departamento: ${feature.properties.departamento}</div>
        <div style="font-size: 14px;">${props?.datasets?.datasets[0]?.label}: ${props?.datasets?.datasets[0]?.data[featureDataIndex]}</div>
        `;
        layer.bindPopup(popupContent);
    };

  return (
    <>
        <MapContainer center={[-31.4216, -64.1860]} zoom={6.5} scrollWheelZoom={true} style={mapStyle} className='div2PDF' >
            <TileLayer
                attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON
                data={dptos}
                style={style}
                onEachFeature={onEachFeature}
            />
        </MapContainer> 
        <MapaLeyenda intervals={allIntervals} getColor={getColor}/>
    </>
    )

}

export default Mapa;