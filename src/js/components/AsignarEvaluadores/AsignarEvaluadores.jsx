// components
import Card from "../Card/Card"
import Badge from "../Badge/Badge"
import ListadoEvaluadores from "./ListadoEvaluadores"
import TablaEvaluadoresAsignados from "./TablaEvaluadoresAsignados"
import Button from "../Button/Button"
// hooks

const AsignarEvaluadores = (props) => {

    const evaluadoresAsignados = props.proyecto.evaluadoresRegionales.map(e => {
        return props.evaluadores.find(evaluador => evaluador._id === e)
    }).filter(ev => ev !== undefined)

    return (
        <Card wide={true} title={'Asignar evaluadores a proyecto'}>
            <div className="project-card-details">
                <p className="project-card-details__detail">
                    <strong>Título: </strong> 
                    {props.proyecto.titulo}
                </p>
                <p className="project-card-details__detail">
                    <strong>Categoria: </strong>
                    <Badge type={props.proyecto.categoria} />
                </p>
                <p className="project-card-details__detail">
                    <strong>Nivel: </strong>
                    <Badge type={props.proyecto.nivel} />
                </p>
            </div>
            <Card title={'Evaluadores Asignados'} className="project-card-table">
                <TablaEvaluadoresAsignados evaluadoresAsignados={evaluadoresAsignados} />
            </Card>
            <ListadoEvaluadores idProyecto={props.proyecto._id}/>
            <div className="button-container">
                    <Button 
                        text='Volver' 
                        onClickHandler={() => {}}
                    />
                    <Button 
                        text='Asignar' 
                        onClickHandler={() => {}}
                        activo={true}
                    />
                </div>
        </Card>
    )
}

export default AsignarEvaluadores