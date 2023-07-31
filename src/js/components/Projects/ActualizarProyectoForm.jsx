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
    })

    const [etapaActual, setEtapaActual] = useState(ETAPAS.Regional)

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
    let sedes = [{
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

    const cambiarModal = (e) => {
        e.preventDefault()
        if(etapaActual === ETAPAS.Escolar) setEtapaActual(ETAPAS.Regional)
        if(etapaActual === ETAPAS.Regional) setEtapaActual(ETAPAS.Grupo)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(e.target.name)
        console.log(e.target.value)
        const nextFormValueState = {
            ...formValues,
            [name]: value
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

        try {
            const { title, description, level, category, schoolName, schoolCue, privateSchool, schoolEmail } = formValues
            const response = await axiosPrivate.patch(`/proyecto/${formData._id}`, 
            JSON.stringify({ titulo: title, descripcion: description, nivel: level, categoria: category, nombreEscuela: schoolName, cueEscuela: schoolCue, privada: privateSchool, emailEscuela: schoolEmail}),
            {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            }
            )
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
            onBlurField={onBlurField}
            formValues={formValues}
            errors={errors}
            sedes={sedes}
        />}
        { etapaActual === ETAPAS.Grupo && <ActualizarGrupoProyecto />}
        <div className='edit-project-form__button'>
            <Button 
                text='Borrar' 
                borrar={true} 
                onClickHandler={handleDelete}
            />
            <Button 
                text={etapaActual !== ETAPAS.Grupo ? 'Continuar' : 'Actualizar'} 
                onClickHandler={etapaActual !== ETAPAS.Grupo ? cambiarModal : handleSubmit} activo={true}/>
        </div>
    </form>
)
}

export default ActualizarProyectoForm