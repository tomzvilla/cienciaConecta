import React from 'react'

const InputField = ({ value, label, name, type, onChange, onBlur, errors, required = false }) => {
    
    let setRequired = false
    if(required){
        setRequired = true
    }
  
    return (
    <div className='input-field'>
        <label className='input-field__label'>
            <span className='input-field__span'>{label} </span>
            <input
                className='input-field__input'
                name={name}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                {...setRequired}
            />
        </label>
        {errors.dirty && errors.error && <small className='input-field__error'>{errors.message}</small>}
    </div>
  )
}

export default InputField
