// Components
import Table from "../../components/Table/Table"

// Hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

const headers = [
  {name: 'Título', value: 'titulo'},
  {name: 'Categoría', value: 'categoria'},
  {name: 'Nivel', value: 'nivel'},
  {name: 'Escuela', value: 'nombreEscuela'},
  {name: 'Estado', value: 'estado' }
]

const states = [
  {nombre: 'En instancia Escolar', _id: '0'},
  {nombre: 'En instancia Regional', _id: '1'},
  {nombre: 'En Evaluacion Regional', _id: '2'},
  {nombre: 'Evaluado en Regional', _id: '3'},
  {nombre: 'Promovido a Nacional', _id: '4'},
  {nombre: 'Finalizado', _id: '5'},
  {nombre: 'Inactivo', _id: '6'},
];

const ViewUserProjects = () => {
    const axiosPrivate = useAxiosPrivate()
    const {data} = useAxiosFetch('/proyecto', axiosPrivate)
    const {data: categories} = useAxiosFetch('/categoria', axiosPrivate)
    const {data: levels} = useAxiosFetch('/nivel', axiosPrivate)

    let proyectos = []
    if(data && categories && levels){
      console.log(data)
      proyectos = data.proyectos.map(obj => {
        const category = categories.categoria.find(element => element._id === obj.categoria)
        const level = levels.nivel.find(element => element._id === obj.nivel)
        const state = states.find(element => element._id === obj.estado)
        if(obj.estado !== '6') {
          return {...obj, categoria: category.nombre, nivel: level.nombre, estado: state.nombre}
        } else {
          return null
        }
      }).filter(project => project !== null)
    }

    console.log(proyectos)
    return (
      <>
          {/* <Navbar/> */}
          {!data ? (<p>Cargando</p>) : (<Table headers={headers} data={proyectos} viewPath={'/projects'} editPath={'/editProjects'} />)}
          
  
      {/* <Footer/> */}
      </>
    )
  
  }
  
  export default ViewUserProjects