

const DownloadFile = (props) => {

    const name = props.name.length > 25 ? props.name.substring(0, 25) + '...' :  props.name;

    return (
        <div className="download-file">
            <p className="download-file__name">{name}</p>
            <img src={props.img} alt={`Descargar ${props.name}`} className="download-file__img" />
        </div>

    );

}


export default DownloadFile;