// Import Components
import Button from "../Button/Button"
import ActualizarEtapaRegionalForm from "./ActualizarEtapaRegionalForm"
import ActualizarEtapaEscolarForm from "./ActualizarEtapaEscolarForm"
import ActualizarGrupoProyecto from "./ActualizarGrupoProyecto"
import Spinner from "../Spinner/Spinner"
// Import hooks
import { useEffect, useState } from "react"
import { useFormValidator } from "../../hooks/useFormValidator"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux"
import { instanciaEscolar } from "../../../App"
import Swal from "sweetalert2"

export const ETAPAS = {
    Escolar: '1',
    Regional: '2',
    Grupo: '3',
};

const ActualizarProyectoForm = ({ formData, getEtapa }) => {
    let isPrivate = '1'
    if(formData.privada === false){
        isPrivate = '0'
    }

    const feria = useSelector(state => state.instancias.feria)
    
    const [formValues, setFormValues] = useState({
        title: formData.titulo,
        description: formData.descripcion,
        level: formData.nivel,
        category: formData.categoria,
        departamento: formData.establecimientoEducativo.departamento,
        localidad: formData.establecimientoEducativo.localidad,
        establecimientoSeleccionado: formData.establecimientoEducativo,
        privateSchool: isPrivate,
        schoolEmail: formData.emailEscuela,
        sede: formData.sede,
        videoPresentacion: formData.videoPresentacion,
        carpetaCampo: { nombre: formData.nameCarpetaCampo, archivo: null },
        informeTrabajo: { nombre: formData.nameInformeTrabajo, archivo: null },
        registroPedagogico: { nombre: formData.nameRegistroPedagogicopdf, archivo: null },
        autorizacionImagen: { nombre: formData.nameAutorizacionImagen, archivo: null },
        grupoProyecto: formData.grupoProyecto.map(alumno => {
            return {
                name: alumno.nombre,
                lastname: alumno.apellido,
                dni: alumno.dni
            };
        }),
    })

    const [etapaActual, setEtapaActual] = useState(ETAPAS.Escolar)

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from || '/misProyectos'

    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

    useEffect(() => {
        console.log(formValues)
        getEtapa(etapaActual)
    }, [etapaActual])

    const { data: categoriesData} = useAxiosFetch('/categoria', axiosPrivate)
    const { data: levelsData} = useAxiosFetch('/nivel', axiosPrivate)

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
        if(etapaActual === ETAPAS.Regional) {
            if(formValues.carpetaCampo.nombre) fieldsToExclude.push('carpetaCampo')
            if(formValues.informeTrabajo.nombre) fieldsToExclude.push('informeTrabajo')
            if(formValues.registroPedagogico.nombre) fieldsToExclude.push('registroPedagogico')
            if(formValues.autorizacionImagen.nombre) fieldsToExclude.push('autorizacionImagen')
            fieldsToExclude.push('grupoProyecto')
        }
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
            [name]: {
                archivo: file,
                nombre: file.name,
            }
        }
        setFormValues(nextFormValueState)
        if (errors[name].dirty) {
            validateForm({form: nextFormValueState, errors, name})
        }

    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        let fieldsToExclude = []
        if(instanciaEscolar.includes(feria.estado)) {
            fieldsToExclude = ['sede', 'videoPresentacion', 'carpetaCampo', 'informeTrabajo', 'registroPedagogico', 'autorizacionImagen', 'grupoProyecto']
        } else {
            if(formValues.carpetaCampo.nombre && !formValues.carpetaCampo.archivo) fieldsToExclude.push('carpetaCampo')
            if(formValues.informeTrabajo.nombre && !formValues.informeTrabajo.archivo) fieldsToExclude.push('informeTrabajo')
            if(formValues.registroPedagogico.nombre && !formValues.registroPedagogico.archivo) fieldsToExclude.push('registroPedagogico')
            if(formValues.autorizacionImagen.nombre && !formValues.autorizacionImagen.archivo) fieldsToExclude.push('autorizacionImagen')
        }

        console.log(fieldsToExclude)
        
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true, fieldsToExclude: fieldsToExclude})
        console.log(isValid)
        console.log(errors)
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
                const { title, description, level, category, privateSchool, establecimientoSeleccionado, schoolEmail, sede, videoPresentacion, carpetaCampo, informeTrabajo, registroPedagogico, autorizacionImagen, grupoProyecto } = formValues
                let response = {}
                if(instanciaEscolar.includes(feria.estado)) {
                    response = await axiosPrivate.patch(`/proyecto/${formData._id}`, 
                    JSON.stringify({ 
                        titulo: title,
                        descripcion: description, 
                        nivel: level, 
                        categoria: category,
                        establecimientoEducativo: establecimientoSeleccionado._id,
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
                    if(registroPedagogico.archivo) pdfs.append('registroPedagogicopdf', registroPedagogico.archivo)
                    if(carpetaCampo.archivo) pdfs.append('carpetaCampo', carpetaCampo.archivo)
                    if(informeTrabajo.archivo) pdfs.append('informeTrabajo', informeTrabajo.archivo)
                    if(autorizacionImagen.archivo) pdfs.append('autorizacionImagen', autorizacionImagen.archivo)

                    response = await axiosPrivate.patch(`/proyecto/regional/${formData._id}`, 
                    JSON.stringify({ 
                        titulo: title, 
                        descripcion: description, 
                        nivel: level, 
                        categoria: category, 
                        establecimientoEducativo: establecimientoSeleccionado._id, 
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
                        await axiosPrivate.post(`/proyecto/regional/upload/${formData._id}`, pdfs,
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
        { (!categoriesData || !levelsData) && <div> <Spinner /> </div>}
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
            {!instanciaEscolar.includes(feria.estado) && <Button 
                text={etapaActual !== ETAPAS.Grupo ? 'Continuar' : 'Actualizar'} 
                onClickHandler={etapaActual !== ETAPAS.Grupo ? cambiarVista : handleSubmit} activo={true}
            />}
            {instanciaEscolar.includes(feria.estado) && <Button 
                text={'Actualizar'} 
                onClickHandler={handleSubmit} activo={true}
            />}
        </div>
    </form>
)
}

export default ActualizarProyectoForm