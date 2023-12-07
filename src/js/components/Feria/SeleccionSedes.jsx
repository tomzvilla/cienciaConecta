import { useEffect, useState } from "react";
import TablaSedes from "./TablaSedes";

const SeleccionSedes = (props) => {
    const [resize, setResize] = useState(window.innerWidth <= 1000);

    const headers = !resize ? [
        {name: 'Establecimiento', value: 'nombre'},
        {name: 'CUE', value: 'cue'},
        {name: 'Cupos', value: 'cupos'},
    ] : [{name: 'Establecimiento', value: 'nombre'},{name: 'Cupos', value: 'cupos'},]

    const handleDelete = (e, item) => {
        e.preventDefault()
        props.handleDelete(e, item)
    }
    
    const handleResize = () => {
        setResize(window.innerWidth <= 1000);
      };
    
      useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);


    const show = props.establecimientos[0] === null ? false : props.establecimientos?.length === 0 ? false : true 

    return (
        <div className="seleccion-sedes">
            <h2 className="seleccion-sedes__title">Sedes seleccionadas</h2>
                {show ?
                <TablaSedes headers={headers} handleDelete={handleDelete} sedes={props.establecimientos} handleChangeCupos={props.handleChangeCupos} prevCupos={props.prevCupos}/>    
                 :
                (<p className="seleccion-sedes__blank"> No hay sedes cargadas </p>)   
            }
        </div>
    )
}


export default SeleccionSedes;
