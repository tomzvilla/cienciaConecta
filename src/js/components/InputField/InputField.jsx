import React from 'react'

const InputField = ({ value, label, name, type, onChange, onBlur, errors, required = false }) => {
    
    const modifier = errors?.error ? "--error" : ""

    return (
    <div className={`input-field input-field${modifier}`}>
            <label className={`input-field__label input-field__label${modifier}`}>{label}</label>
            <input
                className={`input-field__input input-field__input${modifier}`}
                name={name}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                required={required}
            />
        
        {errors && errors.dirty && errors.error && <small className={`input-field__error input-field__error${modifier}`}>{errors.message}</small>}
    </div>
  )
}

export default InputField
