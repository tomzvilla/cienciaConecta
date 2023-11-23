import { useEffect, useState } from "react";
import Table from "../Table/Table"


const SeleccionSedes = (props) => {
    const [resize, setResize] = useState(window.innerWidth <= 1000);

    const headers = !resize ? [
        {name: 'Establecimiento', value: 'nombre'},
        {name: 'CUE', value: 'cue'},
    ] : [{name: 'Establecimiento', value: 'nombre'},]

    const handleDelete = (e, item) => {
        e.preventDefault()
        props.handleDelete(e, item.nombre)
    }

    const handleCupos = (e, item) => {
        e.preventDefault()
        props.handleCupos(e, item.nombre)
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
                <Table modalTitle="Cupos" headers={headers} callback={handleDelete} modal={handleCupos} data={props.establecimientos}/>       
                 :
                (<p className="seleccion-sedes__blank"> No hay sedes cargadas </p>)   
            }
        </div>
    )
}


export default SeleccionSedes;
