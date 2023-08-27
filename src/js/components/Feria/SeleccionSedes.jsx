import Table from "../Table/Table"


const SeleccionSedes = (props) => {
    const headers = [
        {name: 'Establecimiento', value: 'nombre'},
        {name: 'CUE', value: 'cue'},
    ]

    const handleDelete = (e, nombreSede) => {
        e.preventDefault()
        const nombre = nombreSede
        props.handleDelete(e, nombre)
    }

    const handleCupos = (e, item) => {
        e.preventDefault()
        props.handleCupos(e, item.nombre)
    }


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
