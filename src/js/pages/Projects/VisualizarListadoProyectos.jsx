// Components
import TableCard from "../../components/Table/TableCard"
import Spinner from "../../components/Spinner/Spinner"
import Metadata from "../../components/Metadata/Metadata"
import BlankState from "../../components/BlankState/BlankState"
// Hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import capitalizeEachLetter from "../../utils/utils"
const headers = [
  {name: 'Título', value: 'titulo'},
  {name: 'Categoría', value: 'categoria'},
  {name: 'Nivel', value: 'nivel'},
  {name: 'Escuela', value: 'nombreEscuela'},
  {name: 'Estado', value: 'nombreEstado' }
]

const VisualizarListadoProyectos = () => {
    const axiosPrivate = useAxiosPrivate()
    const {data, isLoading} = useAxiosFetch('/proyecto/misProyectos', axiosPrivate)
    const {data: categories} = useAxiosFetch('/categoria', axiosPrivate)
    const {data: levels} = useAxiosFetch('/nivel', axiosPrivate)
    let proyectos = []

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
    

    return (
      <>
        <Metadata title={'Proyecto'}/>
        {isLoading ? (<Spinner />) : proyectos.length === 0 ? (<BlankState msg={'El usuario no tiene proyectos'}/>) : (<TableCard title="Mis Proyectos" headers={headers} data={proyectos} viewPath={'/proyecto'} editPath={'/editarProyecto'} />)}
      </>
    )
  
}

  
export default VisualizarListadoProyectos;
