// Components
import Spinner from "../../components/Spinner/Spinner"
import Metadata from "../../components/Metadata/Metadata"
import BlankState from "../../components/BlankState/BlankState"
import Card from "../../components/Card/Card"
import TablaProyectos from "../../components/Projects/TablaProyectos"
// Hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"

import capitalizeEachLetter from "../../utils/utils"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const VisualizarListadoProyectos = () => {
    const axiosPrivate = useAxiosPrivate()
    const niveles = useSelector(state => state.niveles.niveles)
    const categorias = useSelector(state => state.categorias.categorias)
    const {data, isLoading} = useAxiosFetch('/proyecto/misProyectos', axiosPrivate)
    const {data: categories, isLoading: loadingCategorias} = useAxiosFetch('/categoria', axiosPrivate, niveles.length !== 0)
    const {data: levels, isLoading: loadingNiveles} = useAxiosFetch('/nivel', axiosPrivate, categorias.length !== 0)
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


    if(data && ((!loadingCategorias && !loadingNiveles) || (niveles.length !== 0 && categorias.length !== 0))) {

      proyectos = data.proyectos.map(obj => {
        const category = categorias.length !== 0 ? categorias.find(element => element._id === obj.categoria) : categories.categoria.find(element => element._id === obj.categoria)
        const level = niveles.length !== 0 ? niveles.find(element => element._id === obj.nivel) : levels.nivel.find(element => element._id === obj.nivel)
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
        {isLoading ? (<Spinner />) : proyectos.length === 0 ? (<Card title="Mis Proyectos"> <BlankState msg={'El usuario no tiene proyectos'}/> </Card>) 
        : (
          <Card title="Mis Proyectos" wide={true}>
            <TablaProyectos headers={headers} proyectos={proyectos} />
          </Card>
        
        )}
      </>
    )
  
}

  
export default VisualizarListadoProyectos;
