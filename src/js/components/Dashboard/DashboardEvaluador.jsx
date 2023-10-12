// components
import Card from "../Card/Card"
import Spinner from "../Spinner/Spinner"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import SmallTable from "../Table/SmallTable"

const estados = ["Inactiva", "Inicio", "Escolar", "Regional", "Regional", "Provincial", "Provincial", "Finalización"]

const DashboardEvaluador= () => {
    const axiosPrivate = useAxiosPrivate()

    const { data: listadoData, isLoading } = useAxiosFetch('/evaluacion/pendientes', axiosPrivate)
    const {data: feria, isLoading: loadingFeria} = useAxiosFetch('/feria/activa', axiosPrivate)
     
    
    let proxEstado = ""
    let proxEstadoNombre = ""
    let fechaFin = ""

    let day = ""
    let month = ""
    let year = ""

    let simplifiedDate = ""

    if (feria) {
        proxEstado = feria.feriaActiva.estado === "7" ? feria.feriaActiva.estado : parseInt(feria.feriaActiva.estado) + 1
        proxEstadoNombre = feria.feriaActiva.estado === "7" ? estados[feria.feriaActiva.estado] : estados[parseInt(feria.feriaActiva.estado) + 1]

        fechaFin = proxEstadoNombre == "Escolar" ? feria?.feriaActiva?.instancias.instanciaEscolar?.fechaFinInstancia : 
                proxEstadoNombre == "Regional" ? feria?.feriaActiva?.instancias.instanciaRegional?.fechaFinEvaluacionPresencial :  
                proxEstadoNombre == "Provincial" ?  feria?.feriaActiva?.instancias.instanciaProvincial?.fechaFinEvaluacionPresencial :  ""


        fechaFin = new Date(fechaFin)
        day = String(fechaFin.getDate()).padStart(2, '0');
        month = String(fechaFin.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1
        year = fechaFin.getFullYear();
            
        fechaFin = `${day}/${month}/${year}`;

    }

    // Falta agregar cantidad de proyectos asignados y pendientes.


    return (
        <div>
            
            <Card title={'Dashboard'}>
            {!isLoading && listadoData?.proyectos && feria ? 
            
            

            <div className="dashboard-evaluador">
                <div className="dashboard-evaluador__instancia">
                    <p>Próxima instancia: {proxEstadoNombre}</p>

                    {   
                        proxEstado > 1 ? proxEstado < 7 ? (<p> Fin instancia {proxEstadoNombre} : {fechaFin} </p>)  : ""   : ""

                    }
                    
                </div>
                
                <div className="dashboard-evaluador__proyectos">
                    <h4>Proyectos</h4>
                    <p>Asignados: {listadoData?.proyectos.length}</p>
                    <p>Pendientes de evaluación: {listadoData?.proyectos.length}</p>
                </div>
                
                
                <div className="dashboard-evaluador__tabla">
                    <SmallTable title="Proyectos Activos" data={listadoData?.proyectos} viewPath={'/proyecto'}/> </div> 
                </div>


                :

                <Spinner/> 


            }
            </Card>
            
            
        </div>
    )

}

export default DashboardEvaluador