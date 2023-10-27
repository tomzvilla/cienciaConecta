import { useState } from "react"

const DownloadFile = (props) => {
    const [loading, setLoading] = useState(false)

    const name = props.name.length > 25 ? props.name.substring(0, 25) + '...' :  props.name;

    const style = props.disabled ? "disabled" : loading ? "loading" : ""

    const handleDl = async () => {
        setLoading(true)
        props.handleDownload()

        setTimeout(function() {
            setLoading(false)
          }, 10000);
    }

    return (
        <div onClick={handleDl} className={`download-file download-file--${style} `}>
            <p className={`download-file__name download-file__name--${style}`}>{name}</p>
            <img src={props.img} alt={`Descargar ${props.name}`} className={`download-file__img download-file__img--${style}`} />
        </div>
    );
}

export default DownloadFile;