// Components
import Spinner from "../../components/Spinner/Spinner"
import Metadata from "../../components/Metadata/Metadata"
import BlankState from "../../components/BlankState/BlankState"
// Hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import capitalizeEachLetter from "../../utils/utils"
import Card from "../../components/Card/Card"
import Table from "../../components/Table/Table"
import { useEffect, useState } from "react"

const VisualizarListadoProyectos = () => {
    const axiosPrivate = useAxiosPrivate()
    const {data, isLoading} = useAxiosFetch('/proyecto/misProyectos', axiosPrivate)
    const {data: categories} = useAxiosFetch('/categoria', axiosPrivate)
    const {data: levels} = useAxiosFetch('/nivel', axiosPrivate)
    const [resize, setResize] = useState(window.innerWidth <= 1200);
    let proyectos = []

    const headers = !resize ? [
      {name: 'Título', value: 'titulo'},
      {name: 'Categoría', value: 'categoria'},
      {name: 'Nivel', value: 'nivel'},
      {name: 'Escuela', value: 'nombreEscuela'},
      {name: 'Estado', value: 'nombreEstado' }
    ] : [
      {name: 'Título', value: 'titulo'},
    ];


    if(data && categories && levels) {

      proyectos = data.proyectos.map(obj => {
        const category = categories.categoria.find(element => element._id === obj.categoria)
        const level = levels.nivel.find(element => element._id === obj.nivel)
        if(obj.estado !== '6') {
          return {...obj, categoria: category.nombre, nivel: level.nombre, nombreEscuela: capitalizeEachLetter(obj.establecimientoEducativo.nombre)}
        } else {
          return null
        }
      }).filter(project => project !== null).filter(project => parseInt(project.estado) !== 9)
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
        <Metadata title={'Proyecto'}/>
        {isLoading ? (<Spinner />) : proyectos.length === 0 ? (<BlankState msg={'El usuario no tiene proyectos'}/>) 
        : (
          <Card title="Mis Proyectos" wide={true}>
            <Table title="Mis Proyectos" headers={headers} data={proyectos} viewPath={'/proyecto'} editPath={'/editarProyecto'} />
          </Card>
        
        )}
      </>
    )
  
}

  
export default VisualizarListadoProyectos;
