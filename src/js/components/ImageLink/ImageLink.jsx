import { Link } from "react-router-dom"


const ImageLink = (props) => {
    return (
        <div className="image-link">
            <Link to={props.linkto}><img className="image-link__image" src={props.src} alt={props.alt} /></Link>
        </div>
    )

}

export default ImageLink