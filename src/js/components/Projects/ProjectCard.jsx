// components
import ProjectCardDetails from "./ProjectCardDetails"
import Spinner from "../Spinner/Spinner"
import Card from "../Card/Card"
import ProjectCardHeader from "./ProjectCardHeader"
// hooks
import { useNavigate, useLocation } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useSelector, useDispatch } from "react-redux"
import { instanciaEscolar } from "../../../App"
import { instanciasActions } from "../../../store/instancias-slice"
import Swal from "sweetalert2"


const ProjectCard = (props) => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const feria = useSelector(state => state.instancias.feria)
    const niveles = useSelector(state => state.niveles.niveles)
    const categorias = useSelector(state => state.categorias.categorias)
    const axiosPrivate = useAxiosPrivate()

    const { data: categoriaData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate, niveles.length !== 0)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, categorias.length !== 0)

    const handleDelete = () => {
        if(!instanciaEscolar.includes(feria?.estado)){
            return Swal.fire({
                title: 'Oops! Hubo un error',
                text: 'Solo puedes eliminar tu proyecto en la instancia escolar.',
                icon: 'warning',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }
        Swal.fire({
            title: '¿Deseas eliminar tu proyecto?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Eliminar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Regresar',
            cancelButtonColor: '#D4272D',
        }).then( (result) => {
            if(result.isConfirmed) Swal.fire({
                title: '¿Estas seguro?',
                text: 'La cancelación no podrá deshacerse. Ingresá el título de tu proyecto para confirmar.',
                icon: 'warning',
                input: 'text',
                showCancelButton: true,
                reverseButtons: true,
                showLoaderOnConfirm: true,
                confirmButtonText: 'Confirmar',
                confirmButtonColor: '#00ACE6',
                cancelButtonText: 'Regresar',
                cancelButtonColor: '#D4272D',
                preConfirm: (proyectoInput) => {
                    try {
                        if(proyectoInput !== props.formData.titulo){
                            throw new Error('ERROR, el título de tu proyecto no coincide')
                        }

                    } catch(err) {
                        Swal.showValidationMessage(
                            'Error el título de tu proyecto no coincide'
                        )
                    }
                },
            }).then(async (result) => {
                if(result.isConfirmed) {
                    const success = await deleteProyecto()
                    if(success) Swal.fire({
                        title: 'Eliminaste tu proyecto',
                        icon: 'warning',
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#00ACE6',
                    }).then((result) => {
                        if(result.isConfirmed || result.isDismissed) {
                            dispatch(instanciasActions.removeProyecto())
                            if(location.pathname === '/dashboard') {
                                navigate(0, {replace: true, state: {from:`${location.pathname}`}})
                            } else {
                                navigate('/dashboard', {replace: true, state: {from:`${location.pathname}`}})
                            }
                        }
                    })
                }
            })
        })

        
    }
    
    const deleteProyecto = async () => {
        try {
            await axiosPrivate.delete(`/proyecto/${props.formData._id}`)
            return true
        } catch (err) {
            let msg = ''
            if(!err?.response){
                msg = 'El servidor no respondió.'
            } else if(err.response?.status === 401) {
                msg = 'No estas autorizado para borrar este proyecto.'
            } else {
                msg = `Falló la eliminación de tu proyecto <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la eliinación',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })
        }
    }

    const handleDownload = async () => {
        const fileURL = await descargarQR();
        if (fileURL) {
          try {
            const pdfWindow = window.open();
            if(!pdfWindow) {
              throw new Error('No se pudo abrir la ventana emergente. Verifique la configuración del navegador.')
            }
            pdfWindow.location.href = fileURL;
          } catch (err) {
            Swal.fire({
              title: 'Hubo un problema',
              icon: 'warning',
              text: 'No se pudo abrir el archivo en una nueva pestaña. Habilita las ventanas emergentes en tu navegador para resolver este problema.',
              confirmButtonText: 'OK',
              confirmButtonColor: '#00ACE6'
            })
          }
        }
    }

    const descargarQR = async () => {
        try {
          const response = await axiosPrivate.get(`/proyecto/generarQR/${props.formData._id}`, { responseType: "blob"});
          const file = new Blob([response.data], { type: "application/pdf" });
          const fileURL = window.URL.createObjectURL(file);
          return fileURL; 
        } 
        catch (error) {
          console.log(error)
          return null;
        }
    }
    return (
        

        <Card wide={true} header={<ProjectCardHeader datos={props.formData} handleDelete={handleDelete} handleDownload={handleDownload} goBack={props.goBack} antiguo={props.antiguo}/>}>
            
            
            {(!loadingCategorias && !loadingNiveles) || (categorias.length !== 0 && niveles.length !== 0) ? 
                
            <ProjectCardDetails datos={props.formData} categorias={categoriaData?.categoria ?? categorias} niveles={nivelesData?.nivel ?? niveles} />
        

            :
            <Spinner/>
        }


        </Card>
    )
}

export default ProjectCard