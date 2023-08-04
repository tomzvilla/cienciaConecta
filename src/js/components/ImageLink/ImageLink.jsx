import { Link } from "react-router-dom"


const ImageLink = (props) => {
    const modifier = props.small ? "--small" : ""
    
    return (
        <div className={`image-link image-link${modifier}`}>
            <Link to={props.linkto}><img className={`image-link__image image-link__image${modifier}`} src={props.src} alt={props.alt} /></Link>

        </div>
    )

}

export default ImageLink