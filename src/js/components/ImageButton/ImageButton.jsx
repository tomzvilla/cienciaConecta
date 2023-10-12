
const ImageButton = (props) => {
    
    const modifier = props.small ? "--small" : ""
    const burger = props.burger ? true : false
    
    return (
        <div className={`image-button image-button${modifier}`}>
            <img className={!burger ? `image-button__image image-button__image${modifier}` : `image-button__navbar`} src={props.src} alt={props.alt} onClick={props.callback}/>
        </div>
    )
    
}


export default ImageButton;