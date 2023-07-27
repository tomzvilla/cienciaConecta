import React from 'react'

const InputField = ({ value, label, name, type, onChange, onBlur, errors, required = false }) => {
    
    let setRequired = false
    if(required){
        setRequired = true
    }
  
    return (
    <div className='form-group'>
        <label className='form-group__label'>
            <span className='form-group__span'>{label} </span>
            <input
                className='form-group__input'
                name={name}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                {...setRequired}
            />
        </label>
        {errors.dirty && errors.error && <small className='form-group__error'>{errors.message}</small>}
    </div>
  )
}

export default InputField
