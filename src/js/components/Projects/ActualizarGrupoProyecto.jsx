// components
import Table from "../Table/Table"
import AddAlumno from "./AddAlumno"
import InputField from "../InputField/InputField"

//hooks
import { useState } from "react"
import { useFormValidator } from "../../hooks/useFormValidator"

const ActualizarGrupoProyecto = ({ data, handleAddAlumno, handleDeleteAlumno, formErrors}) => {
    const [alumno, setAlumno] = useState({
        name: '',
        lastname: '',
        dni: '',
    })

    const {errors, validateForm, onBlurField} = useFormValidator(alumno)

    const headers = [
        {name: 'Apellido', value: 'lastname'},
        {name: 'Nombre', value: 'name'},
        {name: 'DNI', value: 'dni'}
      ]

    const handleChange = (e) => {
        const {name, value} = e.target
        const nextAlumnoState = {
            ...alumno,
            [name]: value
        }
        setAlumno(nextAlumnoState)
        if (errors[name].dirty) {
            validateForm({form: nextAlumnoState, errors, name})
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: alumno, errors, forceTouchErrors: true})

        if(!isValid) return

        handleAddAlumno(alumno)

        setAlumno({
            name: '',
            lastname: '',
            dni: '',
        })
    }
    

    const handleDelete = (e) => {
        const dni = e.target.parentNode.parentNode.parentNode.children[2].firstChild.data;

        e.preventDefault()
        handleDeleteAlumno(dni)
    }

    return (

        <div className="actualizar-grupo">
            <Table data={data} headers={headers} callback={handleDelete}/>
            



            <AddAlumno  handleChange={handleChange} onBlurField={onBlurField} alumno={alumno} errors={errors} handleAdd={handleAdd}/>
            

            {formErrors.dirty && formErrors.error && <small>{formErrors.message}</small>}
        </div>
    )
}

export default ActualizarGrupoProyecto