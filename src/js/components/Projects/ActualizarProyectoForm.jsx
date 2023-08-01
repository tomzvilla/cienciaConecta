// Import Components
import Button from "../Button/Button"
import ActualizarEtapaRegionalForm from "./ActualizarEtapaRegionalForm"
import ActualizarEtapaEscolarForm from "./ActualizarEtapaEscolarForm"
import ActualizarGrupoProyecto from "./ActualizarGrupoProyecto"

// Import hooks
import { useState } from "react"
import { useFormValidator } from "../../hooks/useFormValidator"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import { useNavigate, useLocation } from 'react-router-dom'

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

const ActualizarProyectoForm = ({ formData }) => {
    let isPrivate = '1'
    if(formData.privada === false){
        isPrivate = '0'
    }
    
    const [formValues, setFormValues] = useState({
        title: formData.titulo,
        description: formData.descripcion,
        level: formData.nivel,
        category: formData.categoria,
        schoolName: formData.nombreEscuela,
        schoolCue: formData.cueEscuela,
        privateSchool: isPrivate,
        schoolEmail: formData.emailEscuela,
        sede: {},
        videoPresentacion: '',
        carpetaCampo: '',
        informeTrabajo: '',
        registroPedagogico: '',
        autorizacionImagen: '',
        grupoProyecto: []
    })

    const [etapaActual, setEtapaActual] = useState(ETAPAS.Escolar)
    const [instanciaActual, setInstanciaActual] = useState(INSTANCIA.Regional)

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/myprojects'

    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

    const { data: categoriesData} = useAxiosFetch('/categoria', axiosPrivate)
    const { data: levelsData} = useAxiosFetch('/nivel', axiosPrivate)
    // const { data: sedesData} = useAxiosFetch('/sedes', axiosPrivate) no esta listo el endpoint
    let categories = []
    let levels = []
    let sedes = [
        {
            _id: '0',
            nombre: "",
            cue: '0',
        },
        {
            _id: '654612361236123',
            nombre: "Sede 1",
            cue: '1234567',
        },
        {
            _id: '644612361236123',
            nombre: "Sede 2",
            cue: '1234568',
        }
    ]

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
        const nextFormValueState = {
            ...formValues,
            [name]: value
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
        console.log('Entro al submit')
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true})

        if(!isValid) return

        try {
            console.log('Entro al try')
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
                    registroPedagogico: registroPedagogico.path,
                    carpetaCampo: carpetaCampo.path,
                    informeTrabajo: informeTrabajo.path,
                    autorizacionImagen: true,
                    grupoProyecto: grupoProyecto,
                    sede: sede._id
                }),
                    {
                        headers: {'Content-Type': 'application/json'},
                        withCredentials: true
                    }
                )
            }
            
            console.log(JSON.stringify(response?.data))
            console.log(formValues)

        } catch (err) {
            if(!err?.response){
                console.log('El servidor no respondio')
            } else if(err.response?.status === 403) {
                console.log('Datos incorrectos intente nuevamente')
            } else if(err.response?.status === 401) {
                console.log('No estas autorizado para realizar esta operacion')
            } else {
                console.log('Fallo la actualizacion del proyecto')
            }
        }
            
        console.log('Se mando XD')
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
            navigate(from, { replace: true })
        }
        if(etapaActual === ETAPAS.Regional) setEtapaActual(ETAPAS.Escolar)
        if(etapaActual === ETAPAS.Grupo) setEtapaActual(ETAPAS.Regional)
    }

    const handleAddAlumno = (alumno) => {
        if(formValues.grupoProyecto.find(a => a.dni === alumno.dni)){
            console.log('No podes añadir dos veces un mismo alumno')
            return
        }
        setFormValues({...formValues, 
            grupoProyecto: [ ...formValues.grupoProyecto, alumno]
        })
    }
    const handleDeleteAlumno = (alumno) => {
        setFormValues({...formValues, grupoProyecto: formValues.grupoProyecto.filter(obj => obj !== alumno)})
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
        />}
        { etapaActual === ETAPAS.Regional && <ActualizarEtapaRegionalForm 
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            onBlurField={onBlurField}
            formValues={formValues}
            errors={errors}
            sedes={sedes}
        />}
        { etapaActual === ETAPAS.Grupo && <ActualizarGrupoProyecto
            handleAddAlumno={handleAddAlumno}
            handleDeleteAlumno={handleDeleteAlumno}
            data={formValues.grupoProyecto}
        
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