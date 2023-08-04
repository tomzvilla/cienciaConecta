import { useEffect, useState } from "react"

const FileField = ({ value, label, name, onChange, onBlur, errors, required = false }) => {

    const [fileName, setFileName] = useState("")
    const modifier = !fileName ? "" : errors.error ? "--error" :"--loaded"


    let setRequired = false
    if(required){
        setRequired = true
    }

    const onChangeHandler = (e)=> {
        setFileName(e.target.files[0].name)
        onChange(e)
    }


    
    return (
    <div className={`file-field file-field${modifier}`}>
        <label className={`file-field__label file-field__label${modifier}`}>

            {label + fileName}
            <img className='file-field__image' src={require("../../../assets/add.png")} alt="" />
            
            <input
                className='file-field__select'
                type="file"
                accept='.pdf'
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