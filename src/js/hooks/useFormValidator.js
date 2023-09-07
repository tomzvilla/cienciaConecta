import { useState } from 'react'

// Import validators 

import {
    emailValidator,
    passwordValidator,
    confirmPasswordValidator,
    nameValidator,
    lastnameValidator,
    cuilValidator,
    dniValidator,
    positionValidator,
    phoneNumberValidator,
    cueValidator,
    titleValidator,
    descriptionValidator,
    schoolNameValidator,
    categoryValidator,
    levelValidator,
    schoolTypeValidator,
    urlValidator,
    fileValidator,
    sedeValidator,
    groupValidator,
    nombreFeriaValidator,
    dateValidator,
    rubricaValidator,
    ponderacionValidator,
    criterioValidator,
} from '../validators'

const touchErrors = (errors, fieldsToExclude) => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty: true,
        }
        if(fieldsToExclude.find((item) => item === field)){
            acc[field] = {
                ...fieldError,
                dirty: false,
            }
        }
        return acc
    }, {})
}

export const useFormValidator = (form) => {

    const newErrors = {...form}
    Object.keys(form).forEach( (key, index) => {
        newErrors[key] = {
               dirty: false,
               error: false,
               message: ''
        }
    } )

    const [errors, setErrors] = useState(newErrors)

    // const resetErrors = (errorsToReset) => {
    //     errors.forEach((err) => {
    //         console.log(err)
    //         if(errorsToReset.find(err)){
    //             setErrors(
    //                 ...errors,
    //                 errors[err] = {
    //                     dirty: false,
    //                     error: false,
    //                     message: ''
    //                 }
    //             )
    //         }
    //     })
    // } 

    const validateForm = ({form, field, errors, forceTouchErrors = false, fieldsToExclude=[]}) => {
        let isValid = true

        // Create a deep copy of the errors
        let nextErrors = JSON.parse(JSON.stringify(errors));

        if (forceTouchErrors) {
            nextErrors = touchErrors(errors, fieldsToExclude);
        }

        const { email, 
            password,
            confirmPassword,
            name, 
            lastname, 
            dni, 
            cuil, 
            position, 
            phoneNumber, 
            cue,
            title, 
            description, 
            schoolName, 
            schoolEmail, 
            schoolCue, 
            category, 
            level, 
            privateSchool, 
            videoPresentacion, 
            carpetaCampo, 
            informeTrabajo,
            registroPedagogico, 
            autorizacionImagen,
            sede, 
            grupoProyecto, 
            nombreFeria, 
            descripcionFeria, 
            logo, 
            fechaInicioFeria, 
            fechaFinFeria, 
            fechaInicioInstanciaEscolar,
            fechaFinInstanciaEscolar,
            nombreRubrica,
            nombreCriterio,
            ponderacion,
        } = form;

        if (nextErrors.email?.dirty && (field ? field === "email" || field === 'schoolEmail' : true)) {
            const emailMessage = emailValidator(email, form);
            nextErrors.email.error = !!emailMessage;
            nextErrors.email.message = emailMessage;
            if (!!emailMessage) isValid = false;
        }
      
        if (nextErrors.password?.dirty && (field ? field === "password" : true)) {
            const passwordMessage = passwordValidator(password, form);
            nextErrors.password.error = !!passwordMessage;
            nextErrors.password.message = passwordMessage;
            if (!!passwordMessage) isValid = false;
        }

        if (nextErrors.confirmPassword?.dirty && (field ? field === "confirmPassword" : true)) {
            const confirmPasswordMessage = confirmPasswordValidator(password, confirmPassword, form);
            nextErrors.confirmPassword.error = !!confirmPasswordMessage;
            nextErrors.confirmPassword.message = confirmPasswordMessage;
            if (!!confirmPasswordMessage) isValid = false;
        }

        if (nextErrors.name?.dirty && (field ? field === "name" : true)) {
            const nameMessage = nameValidator(name, form);
            nextErrors.name.error = !!nameMessage;
            nextErrors.name.message = nameMessage;
            if (!!nameMessage) isValid = false;
        }

        if (nextErrors.lastname?.dirty && (field ? field === "lastname" : true)) {
            const lastnameMessage = lastnameValidator(lastname, form);
            nextErrors.lastname.error = !!lastnameMessage;
            nextErrors.lastname.message = lastnameMessage;
            if (!!lastnameMessage) isValid = false;
        }

        if (nextErrors.cuil?.dirty && (field ? field === "cuil" : true)) {
            const cuilMessage = cuilValidator(cuil, form);
            nextErrors.cuil.error = !!cuilMessage;
            nextErrors.cuil.message = cuilMessage;
            if (!!cuilMessage) isValid = false;
        }

        if (nextErrors.dni?.dirty && (field ? field === "dni" : true)) {
            const dniMessage = dniValidator(dni, form);
            nextErrors.dni.error = !!dniMessage;
            nextErrors.dni.message = dniMessage;
            if (!!dniMessage) isValid = false;
        }

        if (nextErrors.position?.dirty && (field ? field === "position" : true)) {
            const positionMessage = positionValidator(position, form);
            nextErrors.position.error = !!positionMessage;
            nextErrors.position.message = positionMessage;
            if (!!positionMessage) isValid = false;
        }

        if (nextErrors.phoneNumber?.dirty && (field ? field === "phoneNumber" : true)) {
            const phoneNumberMessage = phoneNumberValidator(phoneNumber, form);
            nextErrors.phoneNumber.error = !!phoneNumberMessage;
            nextErrors.phoneNumber.message = phoneNumberMessage;
            if (!!phoneNumberMessage) isValid = false;
        }

        if (nextErrors.cue?.dirty && (field ? field === "cue" || field === "schoolCue" : true)) {
            const cueMessage = cueValidator(cue, form);
            nextErrors.cue.error = !!cueMessage;
            nextErrors.cue.message = cueMessage;
            if (!!cueMessage) isValid = false;
        }

        if (nextErrors.title?.dirty && (field ? field === "title" : true)) {
            const titleMessage = titleValidator(title, form);
            nextErrors.title.error = !!titleMessage;
            nextErrors.title.message = titleMessage;
            if (!!titleMessage) isValid = false;
        }

        if (nextErrors.description?.dirty && (field ? field === "description" : true)) {
            const descriptionMessage = descriptionValidator(description, form);
            nextErrors.description.error = !!descriptionMessage;
            nextErrors.description.message = descriptionMessage;
            if (!!descriptionMessage) isValid = false;
        }

        if (nextErrors.schoolName?.dirty && (field ? field === "schoolName" : true)) {
            const schoolNameMessage = schoolNameValidator(schoolName, form);
            nextErrors.schoolName.error = !!schoolNameMessage;
            nextErrors.schoolName.message = schoolNameMessage;
            if (!!schoolNameMessage) isValid = false;
        }

        if (nextErrors.schoolEmail?.dirty && (field ? field === "schoolEmail" : true)) {
            const schoolEmailMessage = emailValidator(schoolEmail, form);
            nextErrors.schoolEmail.error = !!schoolEmailMessage;
            nextErrors.schoolEmail.message = schoolEmailMessage;
            if (!!schoolEmailMessage) isValid = false;
        }

        if (nextErrors.schoolCue?.dirty && (field ? field === "schoolCue" : true)) {
            const schoolCueMessage = cueValidator(schoolCue, form);
            nextErrors.schoolCue.error = !!schoolCueMessage;
            nextErrors.schoolCue.message = schoolCueMessage;
            if (!!schoolCueMessage) isValid = false;
        }

        if (nextErrors.category?.dirty && (field ? field === "category" : true)) {
            const categoryMessage = categoryValidator(category, form);
            nextErrors.category.error = !!categoryMessage;
            nextErrors.category.message = categoryMessage;
            if (!!categoryMessage) isValid = false;
        }

        if (nextErrors.level?.dirty && (field ? field === "level" : true)) {
            const levelMessage = levelValidator(level, form);
            nextErrors.level.error = !!levelMessage;
            nextErrors.level.message = levelMessage;
            if (!!levelMessage) isValid = false;
        }

        if (nextErrors.privateSchool?.dirty && (field ? field === "privateSchool" : true)) {
            const privateSchoolMessage = schoolTypeValidator(privateSchool, form);
            nextErrors.privateSchool.error = !!privateSchoolMessage;
            nextErrors.privateSchool.message = privateSchoolMessage;
            if (!!privateSchoolMessage) isValid = false;
        }

        if (nextErrors.videoPresentacion?.dirty && (field ? field === "videoPresentacion" : true)) {
            const videoPresentacionMessage = urlValidator(videoPresentacion, form);
            nextErrors.videoPresentacion.error = !!videoPresentacionMessage;
            nextErrors.videoPresentacion.message = videoPresentacionMessage;
            if (!!videoPresentacionMessage) isValid = false;
        }

        if (nextErrors.carpetaCampo?.dirty && (field ? field === "carpetaCampo" : true)) {
            const carpetaCampoMessage = fileValidator(carpetaCampo, " la carpeta de campo", 'PDF', form);
            nextErrors.carpetaCampo.error = !!carpetaCampoMessage;
            nextErrors.carpetaCampo.message = carpetaCampoMessage;
            if (!!carpetaCampoMessage) isValid = false;
        }

        if (nextErrors.informeTrabajo?.dirty && (field ? field === "informeTrabajo" : true)) {
            const informeTrabajoMessage = fileValidator(informeTrabajo, " el informe de trabajo",'PDF', form);
            nextErrors.informeTrabajo.error = !!informeTrabajoMessage;
            nextErrors.informeTrabajo.message = informeTrabajoMessage;
            if (!!informeTrabajoMessage) isValid = false;
              
        }

        if (nextErrors.registroPedagogico?.dirty && (field ? field === "registroPedagogico" : true)) {
            const registroPedagogicoMessage = fileValidator(registroPedagogico, " el registro pedagógico", 'PDF', form);
            nextErrors.registroPedagogico.error = !!registroPedagogicoMessage;
            nextErrors.registroPedagogico.message = registroPedagogicoMessage;
            if (!!registroPedagogicoMessage) isValid = false;
        }

        if (nextErrors.autorizacionImagen?.dirty && (field ? field === "autorizacionImagen" : true)) {
            const autorizacionImagenMessage = fileValidator(autorizacionImagen, " la autorización de uso de imágen", 'PDF', form);
            nextErrors.autorizacionImagen.error = !!autorizacionImagenMessage;
            nextErrors.autorizacionImagen.message = autorizacionImagenMessage;
            if (!!autorizacionImagenMessage) isValid = false;
        }

        if (nextErrors.sede?.dirty && (field ? field === "sede" : true)) {
            const sedeMessage = sedeValidator(sede, form);
            nextErrors.sede.error = !!sedeMessage;
            nextErrors.sede.message = sedeMessage;
            if (!!sedeMessage) isValid = false;
        }

        if (nextErrors.grupoProyecto?.dirty && (field ? field === "grupoProyecto" : true)) {
            const grupoProyectoMessage = groupValidator(grupoProyecto, form);
            nextErrors.grupoProyecto.error = !!grupoProyectoMessage;
            nextErrors.grupoProyecto.message = grupoProyectoMessage;
            if (!!grupoProyectoMessage) isValid = false;
        }

        if (nextErrors.nombreFeria?.dirty && (field ? field === "nombreFeria" : true)) {
            const nombreFeriaMessage = nombreFeriaValidator(nombreFeria, form);
            nextErrors.nombreFeria.error = !!nombreFeriaMessage;
            nextErrors.nombreFeria.message = nombreFeriaMessage;
            if (!!nombreFeriaMessage) isValid = false;
        }

        if (nextErrors.nombreRubrica?.dirty && (field ? field === "nombreRubrica" : true)) {
            const nombreRubricaMessage = rubricaValidator(nombreRubrica, form);
            nextErrors.nombreRubrica.error = !!nombreRubricaMessage;
            nextErrors.nombreRubrica.message = nombreRubricaMessage;
            if (!!nombreRubricaMessage) isValid = false;
        }

        if (nextErrors.descripcionFeria?.dirty && (field ? field === "descripcionFeria" : true)) {
            const descripcionFeriaMessage = descriptionValidator(descripcionFeria, form);
            nextErrors.descripcionFeria.error = !!descripcionFeriaMessage;
            nextErrors.descripcionFeria.message = descripcionFeriaMessage;
            if (!!descripcionFeriaMessage) isValid = false;
        }

        if (nextErrors.logo?.dirty && (field ? field === "logo" : true)) {
            const logoMessage = fileValidator(logo, " el logo de la feria", 'imágen', form);
            nextErrors.logo.error = !!logoMessage;
            nextErrors.logo.message = logoMessage;
            if (!!logoMessage) isValid = false;
        }

        // formatear la fecha
        const fecha = new Date()
        const fechaActual = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}-${String(fecha.getDate()).padStart(2, '0')}`

        if (nextErrors.fechaInicioFeria?.dirty && (field ? field === "fechaInicioFeria" : true)) {
            const fechaInicioFeriaMessage = dateValidator( {fecha: fechaActual, nombre: 'actual'}, {fecha: fechaInicioFeria, nombre: 'Inicio de la feria'}, form);
            nextErrors.fechaInicioFeria.error = !!fechaInicioFeriaMessage;
            nextErrors.fechaInicioFeria.message = fechaInicioFeriaMessage;
            if (!!fechaInicioFeriaMessage) isValid = false;
        }

        if (nextErrors.fechaFinFeria?.dirty && (field ? field === "fechaFinFeria" : true)) {
            const fechaFinFeriaMessage = dateValidator({fecha: fechaInicioFeria, nombre: 'Inicio de la feria'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'}, form);
            nextErrors.fechaFinFeria.error = !!fechaFinFeriaMessage;
            nextErrors.fechaFinFeria.message = fechaFinFeriaMessage;
            if (!!fechaFinFeriaMessage) isValid = false;
        }

        if (nextErrors.fechaFinFeria?.dirty && (field ? field === "fechaFinFeria" : true)) {
            const fechaFinFeriaMessage = dateValidator( {fecha: fechaActual, nombre: 'actual'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'}, form);
            nextErrors.fechaFinFeria.error = !!fechaFinFeriaMessage;
            nextErrors.fechaFinFeria.message = fechaFinFeriaMessage;
            if (!!fechaFinFeriaMessage) isValid = false;
        }

        if (nextErrors.fechaInicioInstanciaEscolar?.dirty && (field ? field === "fechaInicioInstanciaEscolar" : true)) {
            const fechaInicioInstanciaEscolarMessage = dateValidator({fecha: fechaInicioFeria, nombre: 'Inicio de la feria'}, {fecha: fechaInicioInstanciaEscolar, nombre: 'Inicio instancia escolar'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'}, form);
            nextErrors.fechaInicioInstanciaEscolar.error = !!fechaInicioInstanciaEscolarMessage;
            nextErrors.fechaInicioInstanciaEscolar.message = fechaInicioInstanciaEscolarMessage;
            if (!!fechaInicioInstanciaEscolarMessage) isValid = false;
        }

        if (nextErrors.fechaFinInstanciaEscolar?.dirty && (field ? field === "fechaFinInstanciaEscolar" : true)) {
            const fechaFinInstanciaEscolarMessage = dateValidator({fecha: fechaInicioInstanciaEscolar, nombre: 'Inicio instancia escolar'}, {fecha: fechaFinInstanciaEscolar, nombre: 'Fin instancia escolar'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'}, form);
            nextErrors.fechaFinInstanciaEscolar.error = !!fechaFinInstanciaEscolarMessage;
            nextErrors.fechaFinInstanciaEscolar.message = fechaFinInstanciaEscolarMessage;
            if (!!fechaFinInstanciaEscolarMessage) isValid = false;
        }

        if (nextErrors.fechaInicioEvaluacionRegional?.dirty && (field ? field === "fechaInicioEvaluacionRegional" : true)) {
            const fechaInicioEvaluacionRegionalMessage = dateValidator({fecha: form.fechaFinInstanciaEscolar, nombre: 'Fin instancia escolar'}, {fecha:form.fechaInicioEvaluacionRegional, nombre: 'Inicio evaluación regional'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            nextErrors.fechaInicioEvaluacionRegional.error = !!fechaInicioEvaluacionRegionalMessage;
            nextErrors.fechaInicioEvaluacionRegional.message = fechaInicioEvaluacionRegionalMessage;
            if (!!fechaInicioEvaluacionRegionalMessage) isValid = false;
        }

        if (nextErrors.fechaFinEvaluacionRegional?.dirty && (field ? field === "fechaFinEvaluacionRegional" : true)) {
            const fechaFinEvaluacionRegionalMessage = dateValidator({fecha:form.fechaInicioEvaluacionRegional, nombre: 'Inicio evaluación regional'}, {fecha:form.fechaFinEvaluacionRegional, nombre: 'Fin evaluación regional'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            nextErrors.fechaFinEvaluacionRegional.error = !!fechaFinEvaluacionRegionalMessage;
            nextErrors.fechaFinEvaluacionRegional.message = fechaFinEvaluacionRegionalMessage;
            if (!!fechaFinEvaluacionRegionalMessage) isValid = false;
        }

        if (nextErrors.fechaInicioExposicionRegional?.dirty && (field ? field === "fechaInicioExposicionRegional" : true)) {
            const fechaInicioExposicionRegionalMessage = dateValidator({fecha:form.fechaFinEvaluacionRegional, nombre: 'Fin evaluación regional'}, {fecha:form.fechaInicioExposicionRegional, nombre: 'Inicio exposición regional'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            nextErrors.fechaInicioExposicionRegional.error = !!fechaInicioExposicionRegionalMessage;
            nextErrors.fechaInicioExposicionRegional.message = fechaInicioExposicionRegionalMessage;
            if (!!fechaInicioExposicionRegionalMessage) isValid = false;
        }

        if (nextErrors.fechaFinExposicionRegional?.dirty && (field ? field === "fechaFinExposicionRegional" : true)) {
            const fechaFinExposicionRegionalMessage = dateValidator({fecha:form.fechaInicioExposicionRegional, nombre: 'Inicio exposición regional'}, {fecha:form.fechaFinExposicionRegional, nombre: 'Fin exposición regional'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            nextErrors.fechaFinExposicionRegional.error = !!fechaFinExposicionRegionalMessage;
            nextErrors.fechaFinExposicionRegional.message = fechaFinExposicionRegionalMessage;
            if (!!fechaFinExposicionRegionalMessage) isValid = false;
        }

        if (nextErrors.fechaInicioEvaluacionProvincial?.dirty && (field ? field === "fechaInicioEvaluacionProvincial" : true)) {
            const fechaInicioEvaluacionProvincialMessage = dateValidator({fecha:form.fechaFinExposicionRegional, nombre: 'Fin exposición regional'}, {fecha:form.fechaInicioEvaluacionProvincial, nombre: 'Inicio evaluación provincial'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            nextErrors.fechaInicioEvaluacionProvincial.error = !!fechaInicioEvaluacionProvincialMessage;
            nextErrors.fechaInicioEvaluacionProvincial.message = fechaInicioEvaluacionProvincialMessage;
            if (!!fechaInicioEvaluacionProvincialMessage) isValid = false;
        }

        if (nextErrors.fechaFinEvaluacionProvincial?.dirty && (field ? field === "fechaFinEvaluacionProvincial" : true)) {
            const fechaFinEvaluacionProvincialMessage = dateValidator({fecha:form.fechaInicioEvaluacionProvincial, nombre: 'Inicio evaluación provincial'}, {fecha:form.fechaFinEvaluacionProvincial, nombre: 'Fin evaluación provincial'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            nextErrors.fechaFinEvaluacionProvincial.error = !!fechaFinEvaluacionProvincialMessage;
            nextErrors.fechaFinEvaluacionProvincial.message = fechaFinEvaluacionProvincialMessage;
            if (!!fechaFinEvaluacionProvincialMessage) isValid = false;
        }

        if (nextErrors.fechaInicioPostulacionEvaluadores?.dirty && (field ? field === "fechaInicioPostulacionEvaluadores" : true)) {
            const fechaInicioPostulacionEvaluadoresMessage = dateValidator({fecha:form.fechaInicioPostulacionEvaluadores, nombre: 'Inicio postulación de evaluadores'},{fecha:form.fechaInicioEvaluacionRegional, nombre: 'Inicio evaluación regional'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            nextErrors.fechaInicioPostulacionEvaluadores.error = !!fechaInicioPostulacionEvaluadoresMessage;
            nextErrors.fechaInicioPostulacionEvaluadores.message = fechaInicioPostulacionEvaluadoresMessage;
            if (!!fechaInicioPostulacionEvaluadoresMessage) isValid = false;
        }

        if (nextErrors.fechaFinPostulacionEvaluadores?.dirty && (field ? field === "fechaFinPostulacionEvaluadores" : true)) {
            let fechaFinPostulacionEvaluadoresMessage = dateValidator({fecha:form.fechaInicioPostulacionEvaluadores, nombre: 'Inicio postulación de evaluadores'}, {fecha:form.fechaFinPostulacionEvaluadores, nombre: 'Fin postulación de evaluadores'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            if(fechaFinPostulacionEvaluadoresMessage === ""){
                fechaFinPostulacionEvaluadoresMessage = dateValidator({fecha:form.fechaFinPostulacionEvaluadores, nombre: 'Fin postulación de evaluadores'}, {fecha:form.fechaInicioEvaluacionRegional, nombre: 'Inicio evaluación regional'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            }
            nextErrors.fechaFinPostulacionEvaluadores.error = !!fechaFinPostulacionEvaluadoresMessage;
            nextErrors.fechaFinPostulacionEvaluadores.message = fechaFinPostulacionEvaluadoresMessage;
            if (!!fechaFinPostulacionEvaluadoresMessage) isValid = false;
        }

        if (nextErrors.fechaInicioAsignacionProyectos?.dirty && (field ? field === "fechaInicioAsignacionProyectos" : true)) {
            let fechaInicioAsignacionProyectosMessage = dateValidator({fecha:form.fechaFinPostulacionEvaluadores, nombre: 'Fin postulación de evaluadores'}, {fecha:form.fechaInicioAsignacionProyectos, nombre: 'Inicio asignación de proyectos'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            if(fechaInicioAsignacionProyectosMessage === ""){
                fechaInicioAsignacionProyectosMessage = dateValidator({fecha:form.fechaInicioAsignacionProyectos, nombre: 'Inicio asignación de proyectos'}, {fecha:form.fechaInicioEvaluacionRegional, nombre: 'Inicio evaluación regional'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            }
            nextErrors.fechaInicioAsignacionProyectos.error = !!fechaInicioAsignacionProyectosMessage;
            nextErrors.fechaInicioAsignacionProyectos.message = fechaInicioAsignacionProyectosMessage;
            if (!!fechaInicioAsignacionProyectosMessage) isValid = false;
        }

        if (nextErrors.fechaFinAsignacionProyectos?.dirty && (field ? field === "fechaFinAsignacionProyectos" : true)) {
            let fechaFinAsignacionProyectosMessage = dateValidator({fecha:form.fechaInicioAsignacionProyectos, nombre: 'Inicio asignación de proyectos'}, {fecha:form.fechaFinAsignacionProyectos, nombre: 'Fin asignación de proyectos'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            if(fechaFinAsignacionProyectosMessage === ""){
                fechaFinAsignacionProyectosMessage = dateValidator({fecha:form.fechaFinAsignacionProyectos, nombre: 'Fin asignación de proyectos'}, {fecha:form.fechaInicioEvaluacionRegional, nombre: 'Inicio evaluación regional'}, {fecha: fechaFinFeria, nombre: 'Fin de la feria'},form);
            }
            nextErrors.fechaFinAsignacionProyectos.error = !!fechaFinAsignacionProyectosMessage;
            nextErrors.fechaFinAsignacionProyectos.message = fechaFinAsignacionProyectosMessage;
            if (!!fechaFinAsignacionProyectosMessage) isValid = false;
        }

        if (nextErrors.nombreCriterio?.dirty && (field ? field === "nombreCriterio" : true)) {
            const nombreCriterioMessage = criterioValidator(nombreCriterio, form);
            nextErrors.nombreCriterio.error = !!nombreCriterioMessage;
            nextErrors.nombreCriterio.message = nombreCriterioMessage;
            if (!!nombreCriterioMessage) isValid = false;
        }

        if (nextErrors.ponderacion?.dirty && (field ? field === "ponderacion" : true)) {
            const ponderacionMessage = ponderacionValidator(ponderacion, form);
            nextErrors.ponderacion.error = !!ponderacionMessage;
            nextErrors.ponderacion.message = ponderacionMessage;
            if (!!ponderacionMessage) isValid = false;
        }

        setErrors(nextErrors);

        return {
            isValid,
            errors: nextErrors
        }

    }

    const onBlurField = (e) => {
        const field = e.target.name
        const fieldError = errors[field]

        if(fieldError.dirty) return

        const updatedErrors = {
            ...errors,
            [field]: {
              ...errors[field],
              dirty: true,
            },
        };

        validateForm({ form, field, errors: updatedErrors });
    }
    

    return {validateForm, onBlurField, errors}
}
