import Table from "../Table/Table"


const SeleccionSedes = (props) => {
    const headers = [
        {name: 'Establecimiento', value: 'nombre'},
        {name: 'CUE', value: 'cue'},
      ]

      const handleBorrar = (e) => {
        const nombre = e.target.parentNode.parentNode.parentNode.children[0].firstChild.data

        e.preventDefault()
        props.handleDelete(e, nombre)
    }

    const handleCupos = (e) => {
        const nombre = e.target.parentNode.parentNode.parentNode.children[0].firstChild.data

        e.preventDefault()
        props.handleCupos(e, nombre)
    }


    const show = props.establecimientos[0] === null ? false : props.establecimientos?.length === 0 ? false : true 

    console.log(show)
    console.log(props.establecimientos)


    return (
        <div className="seleccion-sedes">
            <h2 className="seleccion-sedes__title">Sedes seleccionadas</h2>
                {show ?
                <Table modalTitle="Cupos" headers={headers} callback={handleBorrar} modal={handleCupos} data={props.establecimientos}/>       
                 :
                (<p className="seleccion-sedes__blank"> No hay sedes cargadas </p>)   
            }
        </div>
    )
}


export default SeleccionSedes;
