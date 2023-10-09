import arrowUp from '../../../assets/up-arrow.png'
import arrowDown from '../../../assets/down-arrow.png'
// Recibe una imagen, un texto, y un link para navegar onClick
const SidebarDropdown = (props) => {

    return (
        <div className={`sidebar-link`}>
            <button onClick={props.onClick} className="sidebar-link__link sidebar-link__button">
                <img className="sidebar-link__image" src={props.img} alt="" />
                <p className="sidebar-link__text sidebar-link__button-text">{props.text}</p>
                <img className="sidebar-link__image" src={props.dropdown ? arrowUp : arrowDown} alt="Abrir/Cerrar dropdown" />
            </button>
        </div>
    )



}

export default SidebarDropdown;