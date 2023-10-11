import arrowUp from '../../../assets/up-arrow.png'
import arrowDown from '../../../assets/down-arrow.png'

// Recibe una imagen, un texto, y un link para navegar onClick
const SidebarDropdownLink = (props) => {

    return (
        <div className="sidebar-link sidebar-link" onClick={props.onClick}>
            <img className="sidebar-link__image" src={props.img} alt="" />
            <p className="sidebar-link__text ">{props.text}</p>
            <img className="sidebar-link__image" src={props.dropdown ? arrowUp : arrowDown} alt="Abrir/Cerrar dropdown" />
        </div>
    )

}

export default SidebarDropdownLink;