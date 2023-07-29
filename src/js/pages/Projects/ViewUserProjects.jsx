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
  {name: 'Estado', value: 'estado'},
]

const ViewUserProjects = () => {
    const axiosPrivate = useAxiosPrivate()
    const {data} = useAxiosFetch('/proyecto', axiosPrivate)
    const {data: categories} = useAxiosFetch('/categoria', axiosPrivate)
    const {data: levels} = useAxiosFetch('/nivel', axiosPrivate)
    
    return (
      <>
          {/* <Navbar/> */}
          {!data ? (<p>Cargando</p>) : (<Table headers={headers} data={data?.proyectos} />)}
          
  
      {/* <Footer/> */}
      </>
    )
  
  }
  
  export default ViewUserProjects