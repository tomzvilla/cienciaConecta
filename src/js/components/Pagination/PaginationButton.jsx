

const PaginationButton = (props) => {
    return (
        <li key={props.clave} className="pagination-button"> 
            <button onClick={props.onClick} disabled={props.disabled} 
            className={`pagination-button__button ${props.disabled ?  "pagination-button__button--disabled" : ""} ${props.current ?  "pagination-button__button--current" : ""}`}>{props.text}</button>
        </li>
    );
}


export default PaginationButton;