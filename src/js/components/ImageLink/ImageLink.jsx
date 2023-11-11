import { Link, useLocation } from "react-router-dom"


const ImageLink = (props) => {
    const modifier = props.small ? "--small" : ""
    const location = useLocation()
    
    return (
        <div className={`image-link image-link${modifier}`}>
            <Link to={props.linkto} state={{from: `${location.pathname}`}}>
                {props.img ? props.img : <img className={`image-link__image image-link__image${modifier}`} src={props.src} alt={props.alt} />}
            </Link>
        </div>
    )

}

export default ImageLink