// Components
import TableCard from "../../components/Table/TableCard"
import Spinner from "../../components/Spinner/Spinner"

// Hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"


const estados = ["Inactiva", "Inicio", "Instancia escolar", "Instancia regional", "Evaluación regional", "Instancia provincial", "Evaluación provincial", "Finalización",]



const headers = [
  {name: 'Nombre', value: 'nombre'},
  {name: 'Descripcion', value: 'descripcion'},
//   {name: 'Proyectos Inscriptos', value: 'proyectosInscriptos'},
//   {name: 'Evaluador', value: 'evaluadores'},
//   {name: 'Fecha Próxima Instancia', value: 'proximaFecha'},
  {name: 'Estado', value: 'estado' }
]

const VisualizarListadoFerias = () => {
    const axiosPrivate = useAxiosPrivate()

    const {data, isLoading} = useAxiosFetch('/feria', axiosPrivate)
    console.log(data)

    let ferias=[]


    if (data) {
        ferias = data.ferias.map((feria, num) => ({

            ...feria,
            estado: estados[feria.estado],

        })
        
        )


    }
    
    

    return (
      <>

          {isLoading ? (<Spinner />) : data.ferias.length === 0 ? (<p>No hay ferias inscriptas</p>) : (<TableCard title="Mis Ferias" headers={headers} data={ferias} viewPath={'/feria'} editPath={'/editarFeria'} />)}

      </>
    )
  
}

  
export default VisualizarListadoFerias;
