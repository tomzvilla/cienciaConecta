import Badge from "../Badge/Badge"
import GenericBadge from "../Badge/GenericBadge"
import DownloadFile from "../DownloadFile/DownloadFile"

const roles = ['Referente de Evaluador', 'Evaluador', 'Responsable de Proyecto'] // 1=Referente, 2=Evaluador, 3=Responsable

const DatosPostulante = (props) => {

    return (
        <div className="datos-postulante">
            <div className="datos-postulante__download">
                <DownloadFile cv={true} name="Curriculum Vitae" img={require("../../../assets/tarjeta.png")} loading={props.loading}/>
            </div>
            
            <p className="datos-postulante__dato">Sede: {props.sede}</p>
            <p className="datos-postulante__dato">Cargo: {props.cargo}</p>  

            <div className="datos-postulante__badges datos-postulante__badges--first">
                Niveles: {props.niveles.length > 0 ? props.niveles.map( n => (<Badge  key={n._id} type={n} />)) : <GenericBadge text={'Investigador'}/>}
            </div>

            <div className="datos-postulante__badges">
                Categorías: {props.categorias.map( c => (<Badge  key={c._id} type={c} />)
                                             )}
            </div>

            <div className="datos-postulante__badges">
                Antecedentes: { props.antecedentes.length !== 0 ? 
                props.antecedentes.map( a => (<GenericBadge key={a._id} text={a.year + " - " + roles[a.rol-1]}/>))
                : <GenericBadge text={'No posee antecedentes'}/>
            }
            </div>
        </div>
    )
}

export default DatosPostulante;