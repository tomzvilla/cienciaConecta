// components
import SelectField from "../SelectField/SelectField"
import Table from "../Table/Table"
import ImageButton from "../ImageButton/ImageButton"
// hooks
import { useState } from "react"

const headers = [
    {name: 'Año', value: 'year'},
    {name: 'Rol', value: 'rol'},
]

const currentYear = new Date().getFullYear();
const years = [{nombre: '', id:1}];
for (let year = currentYear-1; year >= 1900; year--) {
    let name = year.toString()
    years.push({
        nombre: name,
        id: year,
    });
}

export const ROLES = [
    {nombre: '', id: '0'},
    {nombre: 'REFERENTE DE EVALUADOR', id: '1'},
    {nombre: 'EVALUADOR', id: '2'},
    {nombre: 'RESPONSABLE DE PROYECTO', id: '3'},
]

const PostulacionAntecedentes = (props) => {

    const {formValues, setFormValues, error, setError} = props

    const [antecedente, setAntecedente] = useState({
        year: '',
        rol: '',
    })

    const handleChange = (e) => {
        e.preventDefault()
        const {name, value} = e.target
        setAntecedente({
            ...antecedente,
            [name]: value.toString()
        })
    }

    const handleDelete = (e, item) => {
        e.preventDefault()
        const antecedentesFiltrados = formValues.antecedentes.filter(y => y.year !== item.year)
        setFormValues({
            ...formValues,
            antecedentes: antecedentesFiltrados,
        })
    } 

    const handleAdd = (e) => {
        e.preventDefault()
        if(!antecedente.year) {
            setError({error: true, msg: 'Tenés que ingresar un año'})
            return
        }
        if(!antecedente.rol) {
            setError({error: true, msg: 'Tenés que ingresar un rol'}) 
            return
        }
        const antecedenteParaAgregar = {year: antecedente.year, rol: antecedente.rol}
        const listadoAntecedentes = [...formValues.antecedentes]
        if(listadoAntecedentes.find(a => a.year === antecedente.year)) {
            setError({error: true, msg: 'No podés añadir el mismo año dos veces'})
            return
        }
        listadoAntecedentes.push(antecedenteParaAgregar)
        setFormValues({
            ...formValues,
            antecedentes: listadoAntecedentes,
        })

    }

    return(
        <div className="postulacion-form">
            <h5 className="postulacion-form__title">Agregá tus antecedentes en años anteriores</h5>
            <Table data={formValues.antecedentes} headers={headers} callback={handleDelete}/>
            <div className="add-alumno">
                <div className="add-alumno__alumno add-alumno__alumno--antecedentes">
                    <SelectField
                        label='Año: ' 
                        name='year'
                        dataValues={years}
                        onChange={handleChange}
                        onBlur={() => {}}
                        errors={null}
                        required={true}
                    />
                </div>
                <div className="add-alumno__alumno add-alumno__alumno--antecedentes">
                    <SelectField
                        label='Rol: ' 
                        name='rol'
                        dataValues={ROLES}
                        onChange={handleChange}
                        onBlur={() => {}}
                        errors={null}
                        required={true}
                    />
                </div>

                <div className="add-alumno__alumno add-alumno__alumno--antecedentes">
                    <ImageButton small={true} src={require("../../../assets/add.png")} callback={handleAdd} text="Añadir"/>
                </div>
                
                
            </div>
            {error.error && (<small className="postulacion-form__error"> {error.msg} </small>)}
                
        </div>
    )
}

export default PostulacionAntecedentes