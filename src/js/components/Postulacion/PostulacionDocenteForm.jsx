// components
import PostulacionCategorias from "./PostulacionCategorias"
import PostulacionNiveles from "./PostulacionNiveles"
import PostulacionSedes from "./PostulacionSedes";
import PostulacionAntecedentes from "./PostulacionAntecedentes"
import PostulacionDatos from "./PostulacionDatos";
import Button from "../Button/Button";
//hooks
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { useFormValidator } from "../../hooks/useFormValidator";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

import Swal from "sweetalert2";
import {ROLES} from './PostulacionAntecedentes'
import Card from "../Card/Card";

export const ETAPAS = {
    Categorias: '1',
    Niveles: '2',
    Sedes: '3',
    Antecedentes: '4',
    Datos: '5',
};

const PostulacionDocenteForm = (props) => {
    const {isDocente} = props
    const [etapaActual, setEtapaActual] = useState(ETAPAS.Categorias)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/dashboard'
    const axiosPrivate = useAxiosPrivate()

    const [formValues, setFormValues] = useState({
        categorias: [],
        niveles: [],
        sede: [],
        antecedentes: [],
        curriculum: '',
    })

    const {errors, validateForm, onBlurField} = useFormValidator(formValues)

    const [error, setError] = useState({
        error: false,
        msg: ''
    })

    const handleCambiarVista = (e) => {
        e.preventDefault()
        if(etapaActual === ETAPAS.Categorias) {
            if(formValues.categorias.length === 0){
                setError({error: true, msg:'Tenés que seleccionar como mínimo una categoría'})
                return
            } else setError({ error: false, msg: ''})
            if(isDocente) setEtapaActual(ETAPAS.Niveles)
            else setEtapaActual(ETAPAS.Sedes)
        }
        if(etapaActual === ETAPAS.Niveles) {
            if(formValues.niveles.length === 0 && isDocente){
                setError({error: true, msg:'Tenés que seleccionar como mínimo un nivel'})
                return
            } else setError({ error: false, msg: ''})
            setEtapaActual(ETAPAS.Sedes)
        }
        if(etapaActual === ETAPAS.Sedes) {
            if(formValues.sede.length === 0){
                setError({error: true, msg:'Tenés que seleccionar como mínimo una sede'})
                return
            } else setError({ error: false, msg: ''})
            setEtapaActual(ETAPAS.Antecedentes)
        }
        if(etapaActual === ETAPAS.Antecedentes) {
            setError({ error: false, msg: ''})
            setEtapaActual(ETAPAS.Datos)
        }
       
    }

    const handleVolver = (e) => {
        e.preventDefault()
        setError({
            error: false,
            msg: ''
        })
        if(etapaActual === ETAPAS.Categorias){
            navigate(from, { replace: true })
        }
        if(etapaActual === ETAPAS.Niveles) setEtapaActual(ETAPAS.Categorias)
        if(etapaActual === ETAPAS.Sedes) {
            if(isDocente) setEtapaActual(ETAPAS.Niveles)
            else setEtapaActual(ETAPAS.Categorias)
        }
        if(etapaActual === ETAPAS.Antecedentes) setEtapaActual(ETAPAS.Sedes)
        if(etapaActual === ETAPAS.Datos) setEtapaActual(ETAPAS.Antecedentes)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { isValid } = validateForm({form: formValues, errors, forceTouchErrors: true, fieldsToExclude:['categorias', 'niveles', 'sedes']})
        if(!isValid) return 

        Swal.fire({
            title: '¿Deseas postularte como evaluador?',
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            confirmButtonText: 'Postularme',
            confirmButtonColor: '#00ACE6',
            cancelButtonText: 'Regresar',
            cancelButtonColor: '#D4272D',
        }).then(async (result) => {
            if(result.isConfirmed) {
                const success = await postularEvaluador()
                if(success) Swal.fire({
                    title: '¡Te postulaste como evaluador!',
                    text: 'Te notificaremos luego de que finalice el proceso de selección.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#00ACE6',
                }).then((result) => {
                    if(result.isConfirmed || result.isDismissed) {
                        navigate(from, {replace: true, state: {from:`${location.pathname}`}})
                    }
                })
            }
        })
    }

    const postularEvaluador = async () => {
        try {
            const niveles = formValues.niveles.map( lvl => lvl._id)
            const categorias = formValues.categorias.map( cat => cat._id)
            const sede = formValues.sede[0]._id
            const antecedentes = formValues.antecedentes.map(a => {
                const rol = ROLES.find(r => r.nombre === a.rol)
                return {
                    year: a.year,
                    rol: rol.id
                }
            })
            const pdf = new FormData()
            pdf.append('cv', formValues.curriculum)
    
            const body = JSON.stringify({ 
                docente: isDocente,
                categorias: categorias, 
                sede: sede,
                ...(antecedentes.length !== 0 && {antecedentes: antecedentes}),
                ...(isDocente && {niveles: niveles}),
            })
            const response = await axiosPrivate.post('/evaluador/postular', body,
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                }
            )
            // if(response.status === 200){
            //     // endpoint para subir archivos no esta listo
            //     const responseArchivos = await axiosPrivate.post('/evaluador/upload/cv', pdf,
            //      {headers: {'Content-Type': 'multipart/form-data'}})
            // }
    
            return true
        } catch(err) {
            console.log(err)
            let msg = ''
                if(!err?.response){
                  msg = 'El servidor no respondió'
                } else if(err.response?.status === 401) {
                  msg = 'No estas autorizado para postularte, tenés que ser docente'
                } else {
                  msg = `Falló la postulación <br> ${err.response.data.error}`
                }
                Swal.fire({
                  html: msg,
                  title: 'Falló la postulación',
                  icon: 'error',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#00ACE6',
                })
        }
       
    }

    return(
       
        <Card title="Postularme como Evaluador">
            {etapaActual === ETAPAS.Categorias && (<PostulacionCategorias formValues={formValues} setFormValues={setFormValues} error={error} setError={setError}/>)}
            {etapaActual === ETAPAS.Niveles && isDocente && (<PostulacionNiveles formValues={formValues} setFormValues={setFormValues} error={error} setError={setError}/>)}
            {etapaActual === ETAPAS.Sedes && (<PostulacionSedes formValues={formValues} setFormValues={setFormValues} error={error} setError={setError}/>)}
            {etapaActual === ETAPAS.Antecedentes && (<PostulacionAntecedentes formValues={formValues} setFormValues={setFormValues} error={error} setError={setError}/>)}
            {etapaActual === ETAPAS.Datos && (<PostulacionDatos formValues={formValues} setFormValues={setFormValues} errors={errors} validateForm={validateForm} onBlurField={onBlurField}/>)}
            
            <div className='edit-project-form__button'>
                <Button 
                    text='Atras' 
                    onClickHandler={handleVolver}
                />
                {etapaActual !== ETAPAS.Datos && (<Button 
                    text='Continuar' 
                    onClickHandler={handleCambiarVista}
                    activo={true}
                />)}
                {etapaActual === ETAPAS.Datos && (<Button 
                    text='Postularme' 
                    onClickHandler={handleSubmit}
                    activo={true}
                />)}
            </div>


        </Card>
    )
}

export default PostulacionDocenteForm