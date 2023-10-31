import useAxiosFetch from "../../hooks/useAxiosFetch";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
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

    const { data, isLoading } = useAxiosFetch('/feria/info', axiosPrivate)

    if (data && !isLoading) {
        data.feria.sedes.push(
            {
                nombre: "Total:",
                cantidadProyectosPresentados: data.feria.total_proyectosPresentados,
                cantidadEvaluadores: data.feria.total_evaluadores,
                cantidadProyectosEvaluados: data.feria.total_proyectosEvaluados,
            }
        )

    }

    return (
        <Card title="Feria de Ciencias y Tecnología 2024" wide={true}>
            {   
            isLoading ? 

            <Spinner/>
            :
            <div className="dashboard-comision">
                <div className="dashboard-comision__details">
                    <p>Próxima instancia: {data.feria.prox_instancia}</p>
                    <p>Fin instancia {data.feria.instancia_actual}: {data.feria.prox_fecha}</p>
                </div>

                <Table headers={headers} acciones={false} data={data.feria.sedes}/>
            </div>
            }   
        </Card >
    )
}

export default DashboardComisionAsesora;