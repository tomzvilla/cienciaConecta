
import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Card from '../Card/Card';
import dptos from './dptos.json'

const Mapa = () => {
  const mapStyle = {
    height: '60vh',
    width: '80%',
    margin: '0 auto',
  }

    // Función para estilizar las capas GeoJSON según el número de proyectos
    const style = (feature) => {
      const projectsCount = feature.properties.proyectos || 0;
  
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
      // Aquí puedes definir tu propia lógica para asignar colores según el rango de proyectos
      return projectsCount > 25 ? '#238b45' :
             projectsCount > 5 ? '#74c476' :
             '#c7e9c0';
    };
      // Función para mostrar información emergente en clic del departamento
  const onEachFeature = (feature, layer) => {
    layer.bindPopup(`Departamento: ${feature.properties.departamento}\nProyectos: ${feature.properties.proyectos}`);
  };

  return(
    <div className='container'>
      <MapContainer center={[-31.4216, -64.1860]}
      zoom={6.5} scrollWheelZoom={true} style={mapStyle}>
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
    </div>

  )

}

export default Mapa;

// const Mapa = () => {

//   return (
//     <MapContainer
//       center={[-32.1421, -63.8018]}
//       zoom={6}
//       style={{ height: '500px', width: '100%' }}
//     >
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <Choropleth
//         data={data}  // GeoJSON data with project information
//         valueProperty={(feature) => feature.properties.proyectos}  // Property with project count
//         scale={['#ffffff', '#006837']}  // Color scale
//         steps={5}  // Number of color steps
//         mode="e"
//         style={{ fillColor: '#ffffff', weight: 1, color: '#006837' }}
//         onEachFeature={(feature, layer) => {
//           layer.bindPopup(`Department: ${feature.properties.departamento}\nProjects: ${feature.properties.projectsCount}`);
//         }}
//       />
//     </MapContainer>
//   );
// };

