import React, { useState } from 'react'

const PasswordInput = ({ value, name, type, modifier, onChange, onBlur, required = false }) => {
    const [show, setShow] = useState(false)
    
    return (
        <div className={`password-input password-input${modifier}`}>
            <input
                className={`password-input__input password-input__input${modifier}`}
                name={name}
                type={show ? "text" : type}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                required={required}
            />

            
            {!show ? 
                <img src={require("../../../assets/passnot.png")} className={`password-input__img`} alt={'Mostrar/Ocultar contraseña'} onClick={() => setShow(!show)}/>
                : 
                <img src={require("../../../assets/pass.png")} className={`password-input__img`} alt={'Mostrar/Ocultar contraseña'} onClick={() => setShow(!show)}/>
                }
        </div>
            

                

                
  )
}

export default PasswordInput
