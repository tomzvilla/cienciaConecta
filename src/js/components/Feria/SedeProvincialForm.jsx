// components
import Autocomplete from "../Autocomplete/Autocomplete"
import SelectField from "../SelectField/SelectField"
import CuposModal from "./CuposModal"
import Modal from "../Modal/Modal"
import SeleccionSedes from "./SeleccionSedes"

// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useState } from "react"
const SedeProvincialForm = (props) => {

    const {handleChange, onBlurField, setFormValues, handleDeleteSedeProvincial, formValues} = props
    const axiosPrivate = useAxiosPrivate()
    const [results, setResults] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [selectedSede, setSelectedSede] = useState({})

    const { data: dptoData } = useAxiosFetch('/departamento', axiosPrivate)
    
    let departamentos = [{_id: '', nombre: ''}]
    let localidades = [{_id: '', nombre: ''}]
    let establecimientos = [{_id: '', nombre: ''}]

    if(dptoData) {
        const sigDepartamentos = dptoData.departamentos.map((dpto) => {
           return { 
            _id: dpto,
            nombre: dpto,
        }
        }).sort((dpto1, dpto2) => {
            if (dpto1.nombre < dpto2.nombre) {
              return -1; 
            } else if (dpto1.nombre > dpto2.nombre) {
              return 1;
            }
            return 0;
          });
        departamentos = departamentos.concat(sigDepartamentos)
    }

    const { data: localData } = useAxiosFetch(`/localidad/${formValues.sedeProvincialDpto}`, axiosPrivate)
    if(localData) {
        const sigLocalidades = localData.localidades.map((localidad) => {
            return { 
            _id: localidad,
            nombre: localidad 
        }
        }).sort((local1, local2) => {
            if (local1.nombre < local2.nombre) {
              return -1; 
            } else if (local1.nombre > local2.nombre) {
              return 1;
            }
            return 0;
          });
        localidades = localidades.concat(sigLocalidades)
    }

    const { data: establecimientosData } = useAxiosFetch(`/establecimiento/${formValues.sedeProvincialLocalidad}`, axiosPrivate, !isSelected)
    if(establecimientosData){
        establecimientos = establecimientos.concat(establecimientosData.establecimientos)
    }

    // const handleFilter = (e) => {
    //     if(!e.target.value.trim()) return setResults([])
    //     const filteredValue = establecimientos.filter((sede) => {
    //         if(!formValues.establecimientos.find((s) => sede.nombre === s.nombre))
    //             return sede.nombre.toLowerCase().includes(e.target.value.toLowerCase())
    //     })
    //     setResults(filteredValue)
    // }
    const handleFilter = (e) => {
        const searchTerm = e.target.value.trim().toLowerCase();
        const filteredValue = establecimientos.filter((sede) => {
          return !searchTerm || (
            !formValues.establecimientos.some((s) => sede.nombre === s.nombre) &&
            sede.nombre.toLowerCase().includes(searchTerm)
          );
        });
        setResults(filteredValue);
    };

    const handleSelect = (item) => {
        setFormValues({
            ...formValues, 
            sedeProvincial: item,
            cuposProvincial: []
        })
        
    }

    // const handleFocus = () => {
    //     const notSelectedSedes = establecimientos.filter((sede) => {
    //         if(!formValues.establecimientos.find((s) => sede.nombre === s.nombre))
    //             return sede
    //     })
    //     setResults(notSelectedSedes)
    // }

    const handleFocus = () => {
        const notSelectedSedes = establecimientos.filter((sede) => {
          return !formValues.establecimientos.some((s) => sede.nombre === s.nombre);
        });
        setResults(notSelectedSedes);
    };
    
    const handleChangeDpto = (e) => {
        setIsSelected(false)
        setResults([])
        handleChange(e)
    }

    const handleChangeLocalidad = (e) => {
        setIsSelected(true)
        setResults([])
        handleChange(e)
    }

    const handleDelete = (e) => {
        e.preventDefault()
        handleDeleteSedeProvincial()
    }

    const handleCupos = (e, nombreSede) => {
        e.preventDefault()
        setSelectedSede(nombreSede)
        setShowModal(true)
    }

    
    const getSede = () => {
        return formValues.sedeProvincial
    }

    const cerrarModal = () => {
        setShowModal(false)
    }

    const confirmarCupo = (cupos) => {
        setShowModal(false)
        const prevCupos = [...formValues.cuposProvincial]

        for (const cupo of cupos) {
            const existingIndex = prevCupos.findIndex(c1 => c1.nivel === cupo.nivel);
            
            if (existingIndex !== -1) {
              prevCupos[existingIndex].cantidad = cupo.cantidad;
            } else {
                prevCupos.push(cupo);
            }
        }

        setFormValues({
            ...formValues,
            cuposProvincial: prevCupos
        })

    }

    const getCupos = () => {
        if(formValues.cuposProvincial.length > 0){
            let newCupos = {}
            formValues.cuposProvincial.forEach(cupo => {
                const { nivel, cantidad} = cupo
                newCupos = {...newCupos, [nivel]: cantidad }
            })
            return newCupos
        } else {
            return []
        }
    }
    return (
        <>
            {showModal && 
            <Modal
            title="Cupos"
            setIsOpen={setShowModal}
            component={
                <CuposModal getCupos={(idSede) => getCupos(idSede)} getSede={() => getSede(selectedSede)} 
                cerrarModal={cerrarModal} confirmarCupo={confirmarCupo}/>
            }
            />
            }
            <div className="sedes-feria-form">
        
                <SeleccionSedes  handleCupos={handleCupos} handleDelete={handleDelete} establecimientos={[formValues.sedeProvincial]} />



            <h2 className='sedes-feria-form__title'>Seleccionar Sede Provincial: </h2>
            <div className='sedes-feria-form__input'>
            <SelectField
                    label='Departamento: ' 
                    name='sedeProvincialDpto'
                    dataValues={departamentos}
                    onChange={handleChangeDpto}
                    onBlur={onBlurField}
                    value={formValues.sedeProvincialDpto}
                    errors={null}
                    required={true}
                />
            </div>
            <div className='sedes-feria-form__input'>
            <SelectField
                    label='Localidad: ' 
                    name='sedeProvincialLocalidad'
                    dataValues={localidades}
                    onChange={handleChangeLocalidad}
                    onBlur={onBlurField}
                    value={formValues.sedeProvincialLocalidad}
                    errors={null}
                    required={true}
                    disabled={!formValues.sedeProvincialDpto}
                />
            </div>
            <div className='sedes-feria-form__input'>
            <Autocomplete 
                    results={results} 
                    onChange={handleFilter} 
                    onFocus={handleFocus}
                    onSelect={(item) => handleSelect(item)}
                    disabled={!isSelected}
                    renderItem={(item) => <p> {item.nombre} </p>}
                />
            </div>
        </div>
        
        </>
        
)
}

export default SedeProvincialForm






{/* <>
            {showModal && <CuposModal getCupos={(idSede) => getCupos(idSede)} getSede={() => getSede(selectedSede)} cerrarModal={cerrarModal} confirmarCupo={confirmarCupo}/>}
            
            <h2>Sede Provincial</h2>
            {formValues.sedeProvincial === null ? (<p> No hay sede provincial seleccionada </p>) : (
            
            
                <table className="table">
                <thead className="headBg">
                    <tr>
                        <th scope="col">Establecimiento</th>
                        <th scope="col">CUE</th>
                        <th scope="col">Cupos</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{formValues.sedeProvincial.nombre} </td> 
                        <td>{formValues.sedeProvincial.cue} </td> 
                        <td> 
                            <button onClick={(e) => handleCupos(e, formValues.sedeProvincial.nombre)}>
                                Cupos
                            </button>
                        </td> 
                        <td>
                            <button onClick={(e) => handleDelete(e)}>
                                Borrar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            )}
            
            
        </> */}