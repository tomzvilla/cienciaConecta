const FileField = ({ value, label, name, onChange, onBlur, errors, required = false }) => {
    
    let setRequired = false
    if(required){
        setRequired = true
    }
    
    return (
    <div className='file-field'>
        <label className='file-field__label'>
            <span className='file-field__span'>{label} </span>
            <input
                className='file-field__select'
                type="file"
                accept='.pdf'
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                {...setRequired}
            />
        </label>
        {errors.dirty && errors.error && <small className='file-field__error'>{errors.message}</small>}
    </div>
  )
}

export default FileField