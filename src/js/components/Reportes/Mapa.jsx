import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import dptos from './dptos.json'

const Mapa = (props) => {

    const mapStyle = {
        height: '60vh',
        width: '80%',
        margin: '0 auto',
    }

    // Función para estilizar las capas GeoJSON según el número de proyectos
    const style = (feature) => {
        const featureDataIndex = props?.datasets?.labels?.findIndex(el => {
            if(el.toUpperCase() === feature.properties.departamento) return 1
            return -1
        })

        const projectsCount = props?.datasets?.datasets[0]?.data[featureDataIndex] ?? 0
        return {
            fillColor: getColor(projectsCount),
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
        };
    };
  
    // Función para obtener el color según el número de proyectos
    const getColor = (projectsCount) => {
        console.log('se ejecuto el getColor')
    // Aquí puedes definir tu propia lógica para asignar colores según el rango de proyectos
        return projectsCount > 25 ? '#238b45' :
                projectsCount > 5 ? '#74c476' :
                '#c7e9c0';
    };

    // Función para mostrar información emergente en clic del departamento
    const onEachFeature = (feature, layer) => {
        console.log('se ejecuto el onEachFeature')
        const featureDataIndex = props?.datasets?.labels?.findIndex(el => el.toUpperCase() === feature.properties.departamento)
        layer.bindPopup(`Departamento: ${feature.properties.departamento}\nProyectos: ${props?.datasets?.datasets[0]?.data[featureDataIndex]}`);
    };

  return (
        <MapContainer center={[-31.4216, -64.1860]} zoom={6.5} scrollWheelZoom={true} style={mapStyle} className='div2PDF'>
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
    )

}

export default Mapa;