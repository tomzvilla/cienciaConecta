// components
import ImageButton from "../ImageButton/ImageButton"
import BlankState from "../BlankState/BlankState"

// hooks
import useUtils from "../../hooks/useUtils"
import { useDispatch } from "react-redux"
import { referentesActions } from "../../../store/referentes-slice"
import { useEffect, useState } from "react"
const headers = [
    {name: 'Nombre', value: 'nombre'},
    {name: 'CUIL', value: 'cuil'},
]

const TablaEvaluadoresAsignados = (props) => {
    const { formatCuil } = useUtils()
    const dispatch = useDispatch()
    const [resize, setResize] = useState(window.innerWidth <= 1200);

    const handleBorrar = (idEvaluador) => {
        dispatch(referentesActions.desasignarEvaluador(idEvaluador))
    }

    const handleResize = () => {
        setResize(window.innerWidth <= 1200);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    return (
        props.data.length !== 0 ?
        <table className="table table--fixed-layout">
            <thead className="table__header">

            {!resize ? 
                <tr>
                    {headers.map(header => {
                        return (
                            <th scope="col" key={header.value} className="table-header__head">{header.name}</th>
                            )
                        })
                    }
                    <th scope="col" className="table-header__head">Acciones</th>
                </tr>

                :

                <tr>
                    <th scope="col" key={headers[0].value} className="table-header__head">{headers[0].name}</th>
                    <th scope="col" className="table-header__head">Acciones</th>
                </tr>
                }

            </thead>
            <tbody className="table__body">
                {props.data.map((evaluador) => {
                    
                    return (
                        !resize ? 
                        <tr key={evaluador._id} className="table-body-row">
                            {headers.map(header => {                
                                if(header.name === 'Nombre'){
                                    return (
                                        <td key={header.name} className="table-body-row__td" >{`${evaluador.datos_docente.nombre} ${evaluador.datos_docente.apellido}`}</td>
                                    )
                                }
                                else if(header.name === 'CUIL') {
                                    return (<td key={header.name} className="table-body-row__td" >{formatCuil(evaluador.datos_docente[`${header?.value}`])}</td>)
                                }
                                else return (
                                    <td key={header.name} className="table-body-row__td" >{evaluador.datos_docente[`${header?.value}`]}</td>
                            )})}
                            <td className="table-body-row__td table-body-row__td--actions">
                                <ImageButton small={true} src={require("../../../assets/x.png")} callback={() => handleBorrar(evaluador._id)} text="Borrar"/>
                            </td>
  
                        </ tr>

                        : 

                        <tr key={evaluador._id} className="table-body-row">
                            
                            <td key={headers[0].name} className="table-body-row__td" >{evaluador.datos_docente.nombre + " " + evaluador.datos_docente.apellido}</td>
                            <td className="table-body-row__td table-body-row__td--actions">
                                <ImageButton small={true} src={require("../../../assets/x.png")} callback={() => handleBorrar(evaluador._id)} text="Borrar"/>
                            </td>
  
                        </ tr>
                    )
                    
                }
                )}
            </tbody>
        </table>
        :
        <BlankState msg='No hay evaluadores asignados' small={true}/>
    )
}

export default TablaEvaluadoresAsignados