const SelectField = ({ value, label, name, onChange, onBlur, errors, dataValues, required = false }) => {
    
    let setRequired = false
    if(required){
        setRequired = true
    }
    
    return (
    <div className='form-group'>
        <label className='form-group__label'>
            <span className='form-group__span'>{label} </span>
            <select
                className='form-group__select'
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                {...setRequired}
            >
                {dataValues?.map((el, index) => {
                    return (<option key={index+1} value={index+1}>{el}</option>)
                })}
            </select>
        </label>
        {errors.dirty && errors.error && <small className='form-group__error'>{errors.message}</small>}
    </div>
  )
}

export default SelectField
