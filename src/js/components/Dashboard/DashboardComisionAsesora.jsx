import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import BlankState from "../BlankState/BlankState";
import Card from "../Card/Card";
import Spinner from "../Spinner/Spinner";
import Table from "../Table/Table"

const headers = [
    {name: 'Sede', value: 'nombre'},
    {name: 'Proyectos presentados', value: 'cantidadProyectosPresentados'},
    {name: 'Proyectos evaluados', value: 'cantidadProyectosEvaluados'},
    {name: 'Evaludores', value: 'cantidadEvaluadores'},
]

const DashboardComisionAsesora = (props) => {
    const axiosPrivate = useAxiosPrivate()

    const { data, isLoading, error, status } = useAxiosFetch('/feria/info', axiosPrivate)

    let sedes = []

    if (data && !isLoading) {
        sedes = data.feria.sedes
        if(!data.feria.sedes.find(s => s.nombre === "Total:")) {
            sedes.push(
                {
                    nombre: "Total:",
                    cantidadProyectosPresentados: data.feria.total_proyectosPresentados,
                    cantidadEvaluadores: data.feria.total_evaluadores,
                    cantidadProyectosEvaluados: data.feria.total_proyectosEvaluados,
                }
            )
        }
    }

    return (
        <Card title="Resumen de Feria" wide={true}>
            {   
            isLoading ? <Spinner/>

            : data ? 

            <div className="dashboard-comision">
                <div className="dashboard-comision__details">
                    <p><strong>Próxima instancia: </strong>{data.feria.prox_instancia}</p>
                    <p><strong>Fin instancia {data.feria.instancia_actual}</strong>: {data.feria.prox_fecha}</p>
                </div>

                <Table headers={headers} acciones={false} data={sedes}/>
            </div>
                :
            <BlankState msg="No hay una feria activa ahora mismo. ¡Intentá de nuevo mas tarde!"/>
            }   
        </Card >
    )
}

export default DashboardComisionAsesora;