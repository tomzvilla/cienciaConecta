const TextareaInput = (props) => {
    return (
        <div className={`textarea-input`}>
            <label className={`textarea-input__label textarea-input__label${props.error ? '--error' : ''}`}>{props.label}</label>
            <textarea
                className={`textarea-input__input`}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                rows={3}
                disabled={props.disabled}
            />
            {props.error && <small className='textarea-input__error'>{props.error}</small>}
        </div>
    )
}

export default TextareaInput;