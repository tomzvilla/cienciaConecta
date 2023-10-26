// components
import Card from "../Card/Card"
import Badge from "../Badge/Badge"
import ListadoEvaluadores from "./ListadoEvaluadores"
import TablaEvaluadoresAsignados from "./TablaEvaluadoresAsignados"
import Button from "../Button/Button"
// hooks
import { useNavigate, useLocation } from "react-router-dom"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useSelector } from "react-redux"

import Swal from "sweetalert2"
import SmallTable from "../Table/SmallTable"


const AsignarEvaluadores = (props) => {

    const proyecto = useSelector(state => state.referentes.proyectoEditando)
    const navigate = useNavigate()
    const location = useLocation()
    const axiosPrivate = useAxiosPrivate()
    

    const evaluadoresAsignados = proyecto.evaluadoresRegionales.map(e => {
        return props.evaluadores.find(evaluador => evaluador._id === e)
    }).filter(ev => ev !== undefined)

    const handleVolver = () => {
        const from = location?.state?.from || '/dashboard'
        navigate(from, {replace: true, state: {from:`${location.pathname}`}})
    }

    const handleAsignar = (e) => {
        e.preventDefault()

        Swal.fire({
            title: '¿Deseas asignar estos evaluadores al proyecto?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Asignar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await asignarEvaluadores()
                if(success) Swal.fire({
                    title: 'Evaluadores asignados!',
                    text: 'Asignaste los evaluadores al proyecto con éxito',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                })
            }
        })
    }

    const asignarEvaluadores = async () => {
        try {
            const response = await axiosPrivate.post(`/referente/asignar/${proyecto._id}`, JSON.stringify({evaluadores: proyecto.evaluadoresRegionales}))
            console.log(response)
            if(response.status === 200) return true

        } catch (err) {
            let msg = ''
            if(!err?.response){
                msg = 'El servidor no respondió'
            } else if(err.response?.status === 403) {
                msg = 'Datos incorrectos intente nuevamente'
            } else if(err.response?.status === 401) {
                msg = 'No estas autorizado para realizar esta operación'
            } else {
                msg = `Falló la asignación de evaluadores <br> ${err.response.data.error}`
            }
            Swal.fire({
                html: msg,
                title: 'Falló la asignación de evaluadores',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
            })

        }

    }

    return (
        <Card wide={true} title={'Asignar evaluadores a proyecto'}>
        
        <div className="asignar-evaluadores">
            <div className="asignar-evaluadores__details">
                <p >
                    Título:  {" "} {proyecto.titulo}
                </p>
                <p >
                    Categoria: <Badge type={proyecto.categoria} />  
                </p>
                <p >
                    Nivel: <Badge type={proyecto.nivel} />
                </p>
            </div>
   
            <div className="asignar-evaluadores__asignados">
                <Card title={'Evaluadores Asignados'} className="project-card-table">
                    <TablaEvaluadoresAsignados data={evaluadoresAsignados} />
                    {/* <SmallTable title="Proyectos Activos" data={evaluadoresAsignados} viewPath={'/proyecto'}/> */}
                </Card>
            </div> 

            <div className="asignar-evaluadores__evaluadores">
                <ListadoEvaluadores />
            </div>
            
            <div className="asignar-evaluadores__button">
                <div className="button-container">
                    <Button 
                        text='Volver' 
                        onClickHandler={handleVolver}
                    />
                    <Button 
                        text='Asignar' 
                        onClickHandler={handleAsignar}
                        activo={true}
                    />
                </div>
            </div>
           
            
        </div>
        </Card>
    )
}

export default AsignarEvaluadores