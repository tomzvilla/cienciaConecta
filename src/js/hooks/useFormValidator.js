import { useState } from 'react'

// Import validators 

import {
    emailValidator,
    passwordValidator,
    nameValidator,
    lastnameValidator,
    cuilValidator,
    dniValidator,
    positionValidator,
    phoneNumberValidator,
    cueValidator
} from '../validators'

const touchErrors = (errors) => {
    return Object.entries(errors).reduce((acc, [field, fieldError]) => {
        acc[field] = {
            ...fieldError,
            dirty: true,
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

    const validateForm = ({form, field, errors, forceTouchErrors = false }) => {
        let isValid = true

        // Create a deep copy of the errors
        let nextErrors = JSON.parse(JSON.stringify(errors));

        if (forceTouchErrors) {
            nextErrors = touchErrors(errors);
        }

        const { email, password, name, lastname, dni, cuil, position, phoneNumber, cue } = form;

        if (nextErrors.email?.dirty && (field ? field === "email" : true)) {
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

        if (nextErrors.cue?.dirty && (field ? field === "cue" : true)) {
            const cueMessage = cueValidator(cue, form);
            nextErrors.cue.error = !!cueMessage;
            nextErrors.cue.message = cueMessage;
            if (!!cueMessage) isValid = false;
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
