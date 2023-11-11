import { useState } from "react"

const FileField = ({ value, label, name, onChange, onBlur, errors, accept, required = false, nombreArchivo = '' }) => {

    const [fileName, setFileName] = useState(nombreArchivo)
    let modifier = !fileName ? "" : errors.error ? "--error" :"--loaded"



    let setRequired = false
    if(required){
        setRequired = true
    }

    const onChangeHandler = (e)=> {
        setFileName(e.target.files[0]?.name)
        onChange(e)
    }

    let displayName = fileName?.length > 30 ? fileName.slice(0, 27) + "..." : fileName

    modifier = displayName === undefined ? "--error" : "";
    displayName = displayName === undefined ? "" : displayName;
    

    return (
    <div className={`file-field file-field${modifier}`}>
        <label className={`file-field__label file-field__label${modifier}`}>

            {label + displayName}
            <img className={`file-field__image file-field__image${modifier}`} src={require("../../../assets/add.png")} alt="" />
            
            <input
                className={`file-field__select`}
                type="file"
                accept={accept}
                name={name}
                onChange={onChangeHandler}
                onBlur={onBlur}
                {...setRequired}
            />

        </label>
            
        

        {errors.dirty && errors.error && <small className='file-field__error'>{errors.message}</small>}
    </div>
  )
}

export default FileField