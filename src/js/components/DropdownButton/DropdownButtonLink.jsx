// Recibe una imagen, un texto, y un link para navegar onClick
const DropdownButtonLink = (props) => {

    return (
        <div className="sidebar-link sidebar-link" onClick={props.onClick}>
            <p className="sidebar-link__text ">{props.text}</p>
        </div>
    )

}

export default DropdownButtonLink;