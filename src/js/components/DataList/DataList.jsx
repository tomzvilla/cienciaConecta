import { data } from "autoprefixer"

const DataList = ({ value, label, name, onChange, onBlur, errors, dataValues, list, required = false, disabled = false }) => {
    
    let setRequired = false
    if(required) setRequired = true

    const modifier = errors.error ? "--error" : ""

    return (
    <div className={`data-list data-list${modifier}`}>
        <label className={`data-list__label data-list__label${modifier}`}>
            {label} 
        </label>
        <input 
            name={name} 
            list={`${list}`} 
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            disabled={disabled}
        />
        <datalist className={`data-list__select data-list__select${modifier}`}id={`${list}`} >
            {dataValues?.map((el) => {
              return (<option className={`data-list__option data-list__option${modifier}`} key={el._id} value={el.nombre}>{el.nombre}</option>)
            })}
            
        </datalist>
        
        {errors.dirty && errors.error && <small className='data-list__error'>{errors.message}</small>}
    </div>
  )
}

export default DataList