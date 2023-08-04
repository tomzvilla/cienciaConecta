
const ImageButton = (props) => {
    
    const modifier = props.small ? "--small" : ""
    
    return (
        <div className={`image-button image-button${modifier}`}>
            <img className={`image-button__image image-button__image${modifier}`} src={props.src} alt={props.alt} onClick={props.callback}/>
        </div>
    )
    
}


export default ImageButton;