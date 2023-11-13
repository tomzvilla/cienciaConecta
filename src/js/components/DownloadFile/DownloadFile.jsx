import { useState } from "react"
import { useParams } from "react-router"

import Swal from "sweetalert2"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"


// puede tomar como prop file (se especifica el nombre del archivo a descargar), video (el nombre del video), o cv como booleano

const DownloadFile = (props) => {
    const [loading, setLoading] = useState(false)

    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()

    const name = props.name.length > 25 ? props.name.substring(0, 25) + '...' :  props.name;

    const style = props.disabled ? "disabled" : loading ? "loading" : ""

    const handleDownload = async (link) => {
      
        const fileURL = props.file ? await downloadFile(link) : await cargarCv();
        if (fileURL) {
          try {
            const pdfWindow = window.open();
            if(!pdfWindow) {
              throw new Error('No se pudo abrir la ventana emergente. Verifique la configuración del navegador.')
            }
            pdfWindow.location.href = fileURL;
            return fileURL
          } catch (err) {
            Swal.fire({
              title: 'Hubo un problema',
              icon: 'warning',
              text: 'No se pudo abrir el CV en una nueva pestaña. Habilita las ventanas emergentes en tu navegador para resolver este problema.',
              confirmButtonText: 'OK',
              confirmButtonColor: '#00ACE6'
            })
          }
        }

        return fileURL
    }

    const downloadFile = async (link) => {
        try {
          const response = await axiosPrivate.get(`/proyecto/download/${id}/${link}`, { responseType: "blob"});
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = window.URL.createObjectURL(file);
          return fileURL; 
        } 
        catch (error) {
          console.log(error)
          return null;
        }
    }

    const handleOpen = (link) => {
        try {
            if(!link) {
                throw new Error('No se pudo obtener el video.')
            }
            const newWindow = window.open();
            if(!newWindow) {
              throw new Error('No se pudo abrir la ventana emergente. Verifique la configuración del navegador.')
            }
            newWindow.location.href = link;
          } catch (err) {
            Swal.fire({
              title: 'Hubo un problema',
              icon: 'warning',
              text: 'No se pudo abrir el video en una nueva pestaña. Habilita las ventanas emergentes en tu navegador para resolver este problema.',
              confirmButtonText: 'OK',
              confirmButtonColor: '#00ACE6'
            })
          }

    }

    const cargarCv = async () => {
        try {
          const response = await axiosPrivate.get(`/evaluador/download/v3/cv/${id}`, { responseType: "blob"});
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = window.URL.createObjectURL(file);
          return fileURL; 
        } 
        catch (error) {
          console.log(error)
          return null;
        }
    }

    

    const handleDl = async () => {
        props.video ? setLoading(false) : setLoading(true)

        const response = props.file ? await handleDownload(props.file) : props.cv ? await handleDownload() : handleOpen(props.video);

        if(response) {
          setLoading(false)
        }
    }

    return (
        <div onClick={handleDl} className={`download-file download-file--${style} `}>
            <p className={`download-file__name download-file__name--${style}`}>{name}</p>
            <img src={props.img} alt={`Descargar ${props.name}`} className={`download-file__img download-file__img--${style}`} />
        </div>
    );
}

export default DownloadFile;