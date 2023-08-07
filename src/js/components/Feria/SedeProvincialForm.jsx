// components
import Autocomplete from "../Autocomplete/Autocomplete"
import SelectField from "../SelectField/SelectField"
// hooks
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useState } from "react"
const SedeProvincialForm = (props) => {

    const {handleChange, onBlurField, errors, setFormValues, handleDeleteSedeProvincial, formValues} = props
    const axiosPrivate = useAxiosPrivate()
    const [results, setResults] = useState([])
    const [isSelected, setIsSelected] = useState(false)

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

    const handleFilter = (e) => {
        if(!e.target.value.trim()) return setResults([])
        const filteredValue = establecimientos.filter((sede) => {
            if(!formValues.establecimientos.find((s) => sede.nombre === s.nombre))
                return sede.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setResults(filteredValue)
    }

    const handleSelect = (item) => {
        console.log(item)
        setFormValues({
            ...formValues, 
            sedeProvincial: item
        })
        
    }

    const handleFocus = () => {
        const notSelectedSedes = establecimientos.filter((sede) => {
            if(!formValues.establecimientos.find((s) => sede.nombre === s.nombre))
                return sede
        })
        setResults(notSelectedSedes)
    }
    
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


    return (
        <>
            <h2>Sede Provincial</h2>
            {console.log(formValues.sedeProvincial)}
            {formValues.sedeProvincial === null ? (<p> No hay sede provincial seleccionada </p>) : (
            <table className="table">
                <thead className="headBg">
                    <tr>
                        <th scope="col">Establecimiento</th>
                        <th scope="col">CUE</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{formValues.sedeProvincial.nombre} </td> 
                        <td>{formValues.sedeProvincial.cue} </td> 
                        <td>
                            <button onClick={(e) => handleDelete(e)}>
                                Borrar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            )}
            <h2>Datos de la Sede</h2>
            <div className='edit-project-form__input'>
                <SelectField
                    label='Deparamento: ' 
                    name='sedeProvincialDpto'
                    dataValues={departamentos}
                    onChange={handleChangeDpto}
                    onBlur={onBlurField}
                    value={formValues.sedeProvincialDpto}
                    errors={null}
                    required={true}
                />
            </div>
            <div className='edit-project-form__input'>
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
            <div className='edit-project-form__input'>
                <Autocomplete 
                    results={results} 
                    onChange={handleFilter} 
                    onFocus={handleFocus}
                    onSelect={(item) => handleSelect(item)}
                    disabled={!isSelected}
                    renderItem={(item) => <p> {item.nombre} </p>}
                />
            </div>
        </>
)
}

export default SedeProvincialForm