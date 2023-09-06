
const SelectField = ({ value, label, name, onChange, onBlur, errors, dataValues, required = false, disabled = false }) => {
    

    const modifier = errors?.error ? "--error" : ""

    return (
    <div className={`select-field select-field${modifier}`}>
        <label className={`select-field__label select-field__label${modifier}`}>
        {label} </label>
        <select
            className={`select-field__select select-field__select${modifier}`}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            disabled={disabled}
        >
            {dataValues?.map((el, index) => {

            return (
                <option 
                    key={index} 
                    className={`select-field__option select-field__option${modifier}`} 
                    value={el._id}
                >
                    {el.nombre}
                </option>
            )

            })}
            
        </select>
        
        {errors && errors.dirty && errors.error && <small className='select-field__error'>{errors.message}</small>}
    </div>
  )
}

export default SelectField
