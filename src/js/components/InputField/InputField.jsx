import React from 'react'
import PasswordInput from "./PasswordInput"

const InputField = ({ value, label, name, type, id, onChange, onBlur, errors, required = false, disabled = false }) => {
    
    const modifier = errors?.error ? "--error" : ""
    const pass = type === 'password' ? false : true;

    return (
    <div className={`input-field input-field${modifier}`}>
            <label className={`input-field__label input-field__label${modifier}`}>{label}</label>
            {
                pass ?
                <input
                id={id}
                className={`input-field__input input-field__input${modifier}`}
                name={name}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                required={required}
                disabled={disabled}
            />
            :
            <PasswordInput 
            name={name}
            type={type}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            required={required}
            modifier={modifier}
            />
                

            }
            
        
        {errors && errors.dirty && errors.error && <small className={`input-field__error input-field__error${modifier}`}>{errors.message}</small>}
    </div>
  )
}

export default InputField
