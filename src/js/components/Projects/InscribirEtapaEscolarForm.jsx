// components

import InputField from "../InputField/InputField"
import SelectField from "../SelectField/SelectField"
import Button from "../Button/Button"
import Autocomplete from "../Autocomplete/Autocomplete"
import Card from "../Card/Card"
// hooks
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { useFormValidator } from "../../hooks/useFormValidator"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"

import Swal from "sweetalert2"

const InscribirEtapaEscolarForm = () => {
    
    const [formValues, setFormValues] = useState({
        title: '',
        description: '',
        level: '',
        category: '',
        privateSchool: '',
        schoolEmail: '',
        departamento: '',
        localidad: '',
        establecimientoSeleccionado: '',
    })

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || '/dashboard'

    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

    const { data: categoriesData} = useAxiosFetch('/categoria', axiosPrivate)
    const { data: levelsData} = useAxiosFetch('/nivel', axiosPrivate)
    let categories = []
    if(categoriesData){
        categories = [{_id: 0, nombre: ""}, ...categoriesData.categoria]
    }
    let levels = []
    if(levelsData){
        levels = [{_id: 0, nombre: "", codigo: '0'}, ...levelsData.nivel].sort((level1, level2) => {
            if (level1.codigo < level2.codigo) {
            return -1; 
            } else if (level1.codigo > level2.codigo) {
            return 1;
            }
            return 0;
        });
    }

    const [results, setResults] = useState([])
    const [autocompleteValue, setAutocompleteValue] = useState('')
    let search = {
        departamentos: [{_id: '', nombre: ''}],
        localidades: [{_id: '', nombre: ''}],
        establecimientos: [{_id: '', nombre: ''}],
    }

    const { data: dptoData } = useAxiosFetch('/departamento', axiosPrivate)
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
        sigDepartamentos.unshift(search.departamentos)
        search = {
            departamentos: sigDepartamentos,
            localidades: [{_id: '', nombre: ''}],
            establecimientos: [{_id: '', nombre: ''}]
        }
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
        sigLocalidades.unshift(search.localidades)
        search = {
            departamentos: search.departamentos,
            localidades: sigLocalidades,
            establecimientos: [{_id: '', nombre: ''}]
        }
    }

    const { data: establecimientosData } = useAxiosFetch(`/establecimiento/${formValues.localidad}`, axiosPrivate)
    if(establecimientosData){
        search = {
            ...search,
            establecimientos: establecimientosData.establecimientos
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        let nextFormValueState = {
            ...formValues,
            [name]: value
        }
        if(name === 'departamento') {
            search = {
                ...search,
                localidades: [{_id: '', nombre: ''}],
                establecimientos: [{_id: '', nombre: ''}]
            }
            nextFormValueState = {
                ...formValues,
                localidad: '',
                [name]: value,
            }
            setResults([])
        }
        if(name === 'localidad') {
            search = {
                ...search,
                establecimientos: [{_id: '', nombre: ''}]
            }
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty){
            validateForm({form: nextFormValueState, errors, name})
        }
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})

        if(!isValid) return

        Swal.fire({
            title: '¿Deseas inscribir tu proyecto a la etapa escolar?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Inscribir',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await inscribirProyecto()
                if(success) Swal.fire({
                    title: '¡Proyecto Inscripto!',
                    text: 'Inscribiste tu proyecto con éxito',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
                        setFormValues({
                            title: '',
                            description: '',
                            level: '',
                            category: '',
                            privateSchool: '',
                            schoolEmail: '',
                            departamento: '',
                            localidad: '',
                            establecimientoSeleccionado: '',
                        })
                        navigate('/dashboard', {replace: true, state: {newRol:'2', from:'/inscribirProyecto'}})
                        
                    }
                })
            }})
    
        const inscribirProyecto = async () => {
            try {
                const { title, description, level, category, establecimientoSeleccionado, privateSchool, schoolEmail } = formValues
                await axiosPrivate.post('/proyecto', 
                JSON.stringify({ titulo: title, descripcion: description, nivel: level, categoria: category, establecimientoEducativo: establecimientoSeleccionado._id, privada: privateSchool, emailEscuela: schoolEmail}),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
                )
                return true
        
            } 
            catch (err) {
                let msg = ''
                console.log(JSON.stringify(err.response.data))
                if(!err?.response){
                msg = 'El servidor no respondió'
                } else if(err.response?.status === 403) {
                msg = 'Datos incorrectos intente nuevamente'
                } else if(err.response?.status === 401) {
                msg = 'No estas autorizado para realizar esta operación'
                } else {
                msg = `Falló la inscripción <br> ${err.response.data.error}`
                }
                Swal.fire({
                html: msg,
                title: 'Fallo la inscripción',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#00ACE6',
                })
            }
            
        }

    }
    const handleVolver = (e) => {
        e.preventDefault()
        navigate(from, {replace: true, state: {newRol:'', from:'/inscribirProyecto'}})
    }

    const handleFilter = (e) => {
        if(!e.target.value.trim()) return setResults([])
        const filteredValue = search.establecimientos.filter((sede) => {
            return sede.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setResults(filteredValue)
    }

    const handleSelect = (item) => {
        setFormValues({
            ...formValues, 
            establecimientoSeleccionado: item
        })
        setAutocompleteValue(item)
        
    }

    const handleFocus = () => {
        setAutocompleteValue(undefined)
        setResults(search.establecimientos)
    }
  

    return (
        <Card title="Inscribir proyecto a etapa escolar">
            <form onSubmit={handleSubmit} className='register-project-form'>
            <h2 className='register-project-form__subtitle'>Datos del proyecto: </h2>
            <div className='register-project-form__input'>
                <InputField
                    label='Título: ' 
                    name='title'
                    type='text'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.title}
                    errors={errors.title}
                    required={true}
                />
            </div>
            <div className='register-project-form__input'>
                <InputField
                    label='Descripción: ' 
                    name='description'
                    type='textarea'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.description}
                    errors={errors.description}
                    required={true}
                />
            </div>
            <div className='register-project-form__input'>
                {!levelsData? <SelectField
                    label='Nivel: ' 
                    name='level'
                    dataValues={['Cargando']}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.level}
                    errors={errors.level}
                    required={true}
                />: <SelectField
                    label='Nivel: ' 
                    name='level'
                    dataValues={levels}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.level}
                    errors={errors.level}
                    required={true}
                />}
            </div>
            <div className='register-project-form__input'>
                {!categoriesData ?  
                    <SelectField
                        label='Categoría:' 
                        name='category'
                        dataValues={['Cargando']}
                        onChange={handleChange}
                        onBlur={onBlurField}
                        value={formValues.category}
                        errors={errors.category}
                        required={true}
                    /> :
                    <SelectField
                        label='Categoria:' 
                        name='category'
                        dataValues={categories}
                        onChange={handleChange}
                        onBlur={onBlurField}
                        value={formValues.category}
                        errors={errors.category}
                        required={true}
                    />
                }
            </div>
            <h2 className='register-project-form__subtitle'>Datos del establecimiento educativo: </h2>
            <div className='register-project-form__input'>
                <SelectField
                    label='Departamento: ' 
                    name='departamento'
                    dataValues={search.departamentos}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.departamento}
                    errors={errors.departamento}
                    required={true}
                />
            </div>
            <div className='register-project-form__input'>
                <SelectField
                    label='Localidad: ' 
                    name='localidad'
                    dataValues={search.localidades}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.localidad}
                    errors={errors.localidad}
                    required={true}
                    disabled={!formValues.departamento}
                />
            </div>
            <div className='register-project-form__input'>
                <Autocomplete 
                    results={results} 
                    onChange={handleFilter} 
                    onFocus={handleFocus}
                    onSelect={(item) => handleSelect(item)}
                    disabled={!formValues.localidad}
                    renderItem={(item) => <p> {item.nombre} </p>}
                    value={autocompleteValue?.nombre}
                />
            </div>
            <div className='register-project-form__input'>
                <SelectField
                    label='¿Pertenece a escuela privada?' 
                    name='privateSchool'
                    dataValues={[{nombre: '', _id: 2},{nombre: 'Privada', _id: 1},{nombre: 'Pública', _id: 0}]}
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.privateSchool}
                    errors={errors.privateSchool}
                    required={true}
                />
            </div>
            <div className='register-project-form__input'>
                <InputField
                    label='Email de la escuela' 
                    name='schoolEmail'
                    type='email'
                    onChange={handleChange}
                    onBlur={onBlurField}
                    value={formValues.schoolEmail}
                    errors={errors.schoolEmail}
                    required={true}
                />
            </div>
            <div className='register-project-form__button'>
                    <Button text='Volver' onClickHandler={handleVolver}/>
                    <Button text='Continuar' activo={true}/>
            </div>
        </form>


        </Card>


        
    )
}

export default InscribirEtapaEscolarForm