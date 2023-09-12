// Import Components
import Button from "../Button/Button"
import ActualizarEtapaRegionalForm from "./ActualizarEtapaRegionalForm"
import ActualizarEtapaEscolarForm from "./ActualizarEtapaEscolarForm"
import ActualizarGrupoProyecto from "./ActualizarGrupoProyecto"

// Import hooks
import { useEffect, useState } from "react"
import { useFormValidator } from "../../hooks/useFormValidator"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useNavigate, useLocation } from 'react-router-dom'

import Swal from "sweetalert2"

export const ETAPAS = {
    Escolar: '1',
    Regional: '2',
    Grupo: '3',
  };

const INSTANCIA = {
    Escolar: '1',
    Regional: '2',
    Provincial: '3',
}

const ActualizarProyectoForm = ({ formData, getEtapa }) => {
    let isPrivate = '1'
    if(formData.privada === false){
        isPrivate = '0'
    }
    
    const [formValues, setFormValues] = useState({
        title: formData.titulo,
        description: formData.descripcion,
        level: formData.nivel,
        category: formData.categoria,
        departamento: '',
        localidad: '',
        establecimientoSeleccionado: formData.establecimientoEducativo,
        privateSchool: isPrivate,
        schoolEmail: formData.emailEscuela,
        sede: formData.sede,
        videoPresentacion: formData.videoPresentacion,
        carpetaCampo: formData.carpetaCampo,
        informeTrabajo: formData.informeTrabajo,
        registroPedagogico: formData.registroPedagogico,
        autorizacionImagen: formData.autorizacionImagen,
        grupoProyecto: formData.grupoProyecto.map(alumno => {
            return {
                name: alumno.nombre,
                lastname: alumno.apellido,
                dni: alumno.dni
            };
        }),
    })


    const [etapaActual, setEtapaActual] = useState(ETAPAS.Escolar)
    const [instanciaActual, setInstanciaActual] = useState(INSTANCIA.Regional)

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || '/myprojects'

    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

    useEffect(() => {
        console.log(formValues)
        getEtapa(etapaActual)
    }, [etapaActual])

    const { data: categoriesData} = useAxiosFetch('/categoria', axiosPrivate)
    const { data: levelsData} = useAxiosFetch('/nivel', axiosPrivate)
    // const { data: sedesData} = useAxiosFetch('/sedes', axiosPrivate) no esta listo el endpoint
    let categories = []
    let levels = []

    if(categoriesData){
        categories = [{_id: 0, nombre: ""}, ...categoriesData.categoria]
    }
    if(levelsData){
        levels = [{_id: 0, nombre: ""}, ...levelsData.nivel].sort((level1, level2) => {
            if (level1.codigo < level2.codigo) {
              return -1; 
            } else if (level1.codigo > level2.codigo) {
              return 1;
            }
            return 0;
          });
    }

    const [results, setResults] = useState([])
    const [autocompleteValue, setAutocompleteValue] = useState(formData.establecimientoEducativo)

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

    const cambiarVista = (e) => {
        e.preventDefault()
        let fieldsToExclude = []
        if(etapaActual === ETAPAS.Escolar) fieldsToExclude = ['sede','videoPresentacion','carpetaCampo','informeTrabajo','registroPedagogico','autorizacionImagen','grupoProyecto']
        if(etapaActual === ETAPAS.Regional) fieldsToExclude = ['grupoProyecto']
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true, fieldsToExclude: fieldsToExclude})
        if(etapaActual === ETAPAS.Escolar & isValid) setEtapaActual(ETAPAS.Regional)
        if(etapaActual === ETAPAS.Regional & isValid) setEtapaActual(ETAPAS.Grupo)
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
        if (errors[name].dirty) {
            validateForm({form: nextFormValueState, errors, name})
        }
    }

    const handleFileChange = (e) => {
        const {name} = e.target
        const file = e.target.files[0]
        const nextFormValueState = {
            ...formValues,
            [name]: file
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty) {
            validateForm({form: nextFormValueState, errors, name})
        }

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})

        if(!isValid) return

        Swal.fire({
            title: '¿Deseas actualizar los datos de tu proyecto?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Actualizar',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await actualizarProyecto()
                if(success) Swal.fire({
                    title: '¡Proyecto Actualizado!',
                    text: 'Actualizaste tu proyecto con éxito',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
                        navigate(from, {replace: true, state: {newRol:'2', from:`${location.pathname}`}})
                    }
                })
            }
        })


        const actualizarProyecto = async () => {
            try {
                const { title, description, level, category, schoolName, schoolCue, privateSchool, schoolEmail, sede, videoPresentacion, carpetaCampo, informeTrabajo, registroPedagogico, autorizacionImagen, grupoProyecto } = formValues
                let response = {}
                if(instanciaActual === INSTANCIA.Escolar){
                    response = await axiosPrivate.patch(`/proyecto/${formData._id}`, 
                    JSON.stringify({ 
                        titulo: title,
                        descripcion: description, 
                        nivel: level, 
                        categoria: category, 
                        nombreEscuela: schoolName, 
                        cueEscuela: schoolCue, 
                        privada: privateSchool, 
                        emailEscuela: schoolEmail
                    }),
                        {
                            headers: {'Content-Type': 'application/json'},
                            withCredentials: true
                        }
                    )
                } else {
                    const grupo = grupoProyecto.map(alumno => {
                        return {
                          nombre: alumno.name,
                          apellido: alumno.lastname,
                          dni: alumno.dni
                        };
                    });
                    const pdfs = new FormData()
                    pdfs.append('registroPedagogicopdf', registroPedagogico)
                    pdfs.append('carpetaCampo', carpetaCampo)
                    pdfs.append('informeTrabajo', informeTrabajo)
                    pdfs.append('autorizacionImagen', autorizacionImagen)
                    response = await axiosPrivate.patch(`/proyecto/regional/${formData._id}`, 
                    JSON.stringify({ 
                        titulo: title, 
                        descripcion: description, 
                        nivel: level, 
                        categoria: category, 
                        nombreEscuela: schoolName, 
                        cueEscuela: schoolCue, 
                        privada: privateSchool, 
                        emailEscuela: schoolEmail,
                        videoPresentacion: videoPresentacion,
                        grupoProyecto: grupo,
                        sede: sede
                    }),
                        {
                            headers: {'Content-Type': 'application/json'},
                            withCredentials: true
                        }
                    )
                    if(response.status === 200){
                        const responseArchivos = await axiosPrivate.post(`/proyecto/regional/upload/${formData._id}`, pdfs,
                        {headers: {'Content-Type': 'multipart/form-data'}})

                    }
                    
                }

                return true
    
            }  
            catch (err) {
                let msg = ''
                if(!err?.response){
                  msg = 'El servidor no respondió'
                } else if(err.response?.status === 403) {
                  msg = 'Datos incorrectos intente nuevamente'
                } else if(err.response?.status === 401) {
                  msg = 'No estas autorizado para realizar esta operación'
                } else {
                  msg = `Falló la actualización del proyecto <br> ${err.response.data.error}`
                }
                Swal.fire({
                  html: msg,
                  title: 'Fallo la actualización',
                  icon: 'error',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#00ACE6',
                })
            }

        }

    }

    const handleDelete = async (e) => {
        try {
            e.preventDefault()
            await axiosPrivate.delete(`/proyecto/${formData._id}`)
        } catch (err) {
            console.log(err)
        }
        setTimeout(() => {
            navigate(from, { replace: true })
          }, 2000);
    }

    const handleVolver = (e) => {
        e.preventDefault()
        if(etapaActual === ETAPAS.Escolar){
            navigate(from, {replace: true, state: {newRol:'2', from:`${location.pathname}`}})
        }
        if(etapaActual === ETAPAS.Regional) setEtapaActual(ETAPAS.Escolar)
        if(etapaActual === ETAPAS.Grupo) setEtapaActual(ETAPAS.Regional)
    }

    const handleAddAlumno = (alumno) => {
        const alumnos = [...formValues.grupoProyecto]
        if(formValues.grupoProyecto.find(a => a.dni === alumno.dni)){
            console.log('No podes añadir dos veces un mismo alumno')
            return
        }
        alumnos.push(alumno)
        setFormValues({
            ...formValues, 
            grupoProyecto: alumnos
        })
        if(alumnos.length >= 1) {
            errors.grupoProyecto = {
                dirty: true,
                errors: false,
                message: ''
            }
        }
    }
    const handleDeleteAlumno = (dni) => {
        setFormValues({...formValues, grupoProyecto: formValues.grupoProyecto.filter(obj => obj.dni !== dni)})
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
    <form className='edit-project-form'>
        <h2 className='edit-project-form__title'> Editar proyecto </h2>
        { etapaActual === ETAPAS.Escolar && categoriesData && levelsData && <ActualizarEtapaEscolarForm 
            handleChange={handleChange}
            onBlurField={onBlurField}
            formValues={formValues}
            errors={errors}
            levels={levels}
            categories={categories}
            handleSelect={handleSelect}
            handleFilter={handleFilter}
            handleFocus={handleFocus}
            results={results}
            autocompleteValue={autocompleteValue}
            search={search}
        />}
        { etapaActual === ETAPAS.Regional && <ActualizarEtapaRegionalForm 
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            onBlurField={onBlurField}
            formValues={formValues}
            errors={errors}
        />}
        { etapaActual === ETAPAS.Grupo && <ActualizarGrupoProyecto
            handleAddAlumno={handleAddAlumno}
            handleDeleteAlumno={handleDeleteAlumno}
            data={formValues.grupoProyecto}
            formErrors={errors.grupoProyecto}
        
        />}
        <div className='edit-project-form__button'>
            <Button 
                text='Volver' 
                onClickHandler={handleVolver}
            />
            {instanciaActual === INSTANCIA.Regional && <Button 
                text={etapaActual !== ETAPAS.Grupo ? 'Continuar' : 'Actualizar'} 
                onClickHandler={etapaActual !== ETAPAS.Grupo ? cambiarVista : handleSubmit} activo={true}
            />}
            {instanciaActual === INSTANCIA.Escolar && <Button 
                text={'Actualizar'} 
                onClickHandler={handleSubmit} activo={true}
            />}
        </div>
    </form>
)
}

export default ActualizarProyectoForm