// components
import Card from "../Card/Card"
import Badge from "../Badge/Badge"
import Button from "../Button/Button"
// hooks
import { useParams, useNavigate, useLocation } from "react-router"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { useSelector } from "react-redux"

const EvaluacionCard = () => {
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const location = useLocation()

    let proyecto = useSelector(state => state.evaluacion.listadoEvaluaciones.find(p => p._id === id))

    // Si recarga la pagina se hacen estas consultas
    const { data: proyectoData, isLoading } = useAxiosFetch(`/evaluacion/pendientes/${id}`, axiosPrivate, !!proyecto)
    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate, !!proyecto)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, !!proyecto)

    const { proyectoMap } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingCategorias && !loadingNiveles && !isLoading })
   
    if(!isLoading && proyectoData?.proyecto) {
        proyecto = proyectoMap(proyectoData.proyecto)
    }

    const navigate = useNavigate()
    
    const iniciarEvaluacion = () => {
        navigate(`/evaluar/${id}/iniciar`, {state: {from: location.pathname }})
    }

    return(
        proyecto ?
        <Card title={proyecto.titulo}>
            <div className="project-card-details">
                <p className="project-card-details__detail">
                    <strong>Descripción: </strong> 
                    {proyecto.descripcion}
                </p>
                <p className="project-card-details__detail">
                    <strong>Categoria: </strong> 
                    <Badge type={proyecto.categoria} />
                </p>
                <p className="project-card-details__detail">
                    <strong>Nivel: </strong> 
                    <Badge type={proyecto.nivel} />
                </p>
                <p className="project-card-details__detail">
                    <strong>Estado: </strong> 
                    {proyecto.nombreEstado}
                </p>
                <div className="project-card-details__detail">
                    <strong>Informe de trabajo</strong>
                </div>
                <div className="project-card-details__detail">
                    <strong>Carpeta de Campo</strong>
                </div>
                <div className="project-card-details__detail">
                    <strong>Video</strong>
                </div>
                <div className="project-card-details__detail">
                    <strong>Evaluaciones</strong>
                    <div>
                        Realizadas
                        {proyecto.evaluadoresRegionales.map( e =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} checked disabled />
                        )}

                    </div>
                    <div>
                        Confirmadas
                        {proyecto.evaluadoresRegionales.map( e =>
                            <input type="checkbox" key={e} id={e} value={'ponerValor'} checked disabled />
                        )}

                    </div>
                </div>
            </div>
            <div>
                <Button 
                    text='Evaluar' 
                    onClickHandler={iniciarEvaluacion}
                    activo={true}
                />
                <Button 
                    text='Confirmar' 
                    onClickHandler={() => {}}
                    activo={true}
                    disabled={true}
                />
            </div>
        </Card>
        :
        null
    )

}

export default EvaluacionCard