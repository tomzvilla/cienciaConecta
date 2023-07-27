import { useEffect } from "react"
import useAxiosPrivate from "../hooks/useAxiosPrivate"

const Projects = () => {
  const axiosPrivate = useAxiosPrivate()

  const inscribirProyecto = async () => {
    try {
      const body = {
        "titulo":"Nombre Proyecto",
        "descripcion":"Descripcion aaaaaaaaaaaaaaaaaaaaaaaaaaaaa", 
        "nivel": 2,
        "categoria": 3,
        "nombreEscuela": "PIO XII",
        "cueEscuela": "1234567",
        "privada": false,
        "emailEscuela":"escuela@test.com"
      }

      const response = await axiosPrivate.post('/proyecto', JSON.stringify(body), {headers: {'Content-Type': 'application/json'}})

      console.log(response.data)
    } catch (err) {
      console.error(err)
    }
  }

  const handleClick = (e) => {
    e.preventDefault()
    inscribirProyecto()
  }

  return (
    <div className='projects'>
        ACA VAN LOS PROYECTOS
        <button onClick={handleClick}>
          INSCRIBIR PROYECTO
        </button>
    </div>
  )
}

export default Projects