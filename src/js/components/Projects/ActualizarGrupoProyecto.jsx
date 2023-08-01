// components
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
    
    const handleDelete = (e, dni) => {
        e.preventDefault()
        handleDeleteAlumno(dni)
    }

    return (
        <div>
            <table className="table">
                <thead className="headBg">
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">DNI</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.name} </td> 
                            <td>{item.lastname} </td> 
                            <td>{item.dni} </td> 
                            <td>
                                <button onClick={(e, dni) => handleDelete(e, item.dni)}>
                                    Borrar
                                </button>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>
            <div>
                <div className='edit-project-form__input'>
                    <InputField
                        label='Nombre Alumno: ' 
                        name='name'
                        type='text'
                        onChange={handleChange}
                        onBlur={onBlurField}
                        value={alumno.name}
                        errors={errors.name}
                        required={true}
                    />
                </div>
                <div className='edit-project-form__input'>
                    <InputField
                        label='Apellido Alumno: ' 
                        name='lastname'
                        type='text'
                        onChange={handleChange}
                        onBlur={onBlurField}
                        value={alumno.lastname}
                        errors={errors.lastname}
                        required={true}
                    />
                </div>
                <div className='edit-project-form__input'>
                    <InputField
                        label='DNI Alumno: ' 
                        name='dni'
                        type='number'
                        onChange={handleChange}
                        onBlur={onBlurField}
                        value={alumno.dni}
                        errors={errors.dni}
                        required={true}
                    />
                </div>
                <button onClick={handleAdd}>
                    Añadir
                </button>
            </div>
            {formErrors.dirty && formErrors.error && <small>{formErrors.message}</small>}
        </div>
    )
}

export default ActualizarGrupoProyecto