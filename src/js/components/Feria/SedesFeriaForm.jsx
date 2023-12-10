// components
import SelectField from "../SelectField/SelectField"
import Autocomplete from "../Autocomplete/Autocomplete";
import SeleccionSedes from "./SeleccionSedes";

// hooks
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import { useState } from "react";

const SedesFeriaForm = (props) => {
    const {handleChange, onBlurField, formValues, errors, setFormValues, handleDeleteSede} = props
    const axiosPrivate = useAxiosPrivate()

    const { data: dptoData } = useAxiosFetch('/departamento', axiosPrivate)
    
    let departamentos = [{_id: '', nombre: ''}]
    let localidades = [{_id: '', nombre: ''}]
    let establecimientos = [{_id: '', nombre: ''}]
    const [results, setResults] = useState([])
    const [isSelected, setIsSelected] = useState(false)

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

    const { data: localData } = useAxiosFetch(`/localidad/${formValues.departamento}`, axiosPrivate)
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

    const { data: establecimientosData } = useAxiosFetch(`/establecimiento/${formValues.localidad}`, axiosPrivate, !isSelected)
    if(establecimientosData){
        establecimientos = establecimientos.concat(establecimientosData.establecimientos)
    }

    const handleFilter = (e) => {
        if(!e.target.value.trim()) return setResults([])
        const filteredValue = establecimientos.filter((sede) => {
            if(!formValues.establecimientos.find((s) => sede.nombre === s.nombre))
                return sede.nombre.toLowerCase().includes(e.target.value.toLowerCase())
            return null
        })
        setResults(filteredValue)
    }

    const handleSelect = (item) => {
        const selectedSedes = [...formValues.establecimientos]
        if(formValues.establecimientos.find(s => s.nombre === item.nombre)){
            console.log('No podes añadir dos veces una misma sede')
            return
        }
        selectedSedes.push(item)
        setFormValues({
            ...formValues, 
            establecimientos: selectedSedes
        })
        
    }

    const handleFocus = () => {
        const notSelectedSedes = establecimientos.filter((sede) => {
            if(!formValues.establecimientos.find((s) => sede.nombre === s.nombre))
                return sede
            else return null
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

    const handleDelete = (e, nombreSede) => {
        e.preventDefault()
        handleDeleteSede(nombreSede)
    }

    const handleChangeCupos = (cupo) => {
        const index = formValues.cupos?.porSede ? formValues.cupos?.porSede?.findIndex(c => c.sede === cupo.sede) : -1
        const newCupos = formValues.cupos?.porSede ? [...formValues.cupos.porSede] : []
        if(index !== -1) {
            newCupos[index] = {
                ...newCupos[index],
                cantidad: cupo.cantidad
            }

        } else {
            newCupos.push(cupo)
        }
        setFormValues({
            ...formValues,
            cupos: {
                ...formValues.cupos,
                porSede: newCupos
            },
        })
    }

    const getSede = (nombreSede) => {
        return formValues.establecimientos.find(s => s.nombre === nombreSede)
    }

    return (
        <>
            <div className="sedes-feria-form">
                <SeleccionSedes handleDelete={handleDelete} establecimientos={formValues.establecimientos} handleChangeCupos={handleChangeCupos} prevCupos={formValues.cupos.porSede} />
                <h2 className='sedes-feria-form__title'>Seleccionar Sede: </h2>
                <div className='sedes-feria-form__input'>
                    <SelectField
                        label='Departamento: ' 
                        name='departamento'
                        dataValues={departamentos}
                        onChange={handleChangeDpto}
                        onBlur={onBlurField}
                        value={formValues.departamento}
                        errors={errors.departamento}
                        required={true}
                    />
                </div>
                <div className='sedes-feria-form__input'>
                    <SelectField
                        label='Localidad: ' 
                        name='localidad'
                        dataValues={localidades}
                        onChange={handleChangeLocalidad}
                        onBlur={onBlurField}
                        value={formValues.localidad}
                        errors={errors.localidad}
                        required={true}
                        disabled={!formValues.departamento}
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

export default SedesFeriaForm