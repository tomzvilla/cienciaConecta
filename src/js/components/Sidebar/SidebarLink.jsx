
// Recibe una imagen, un texto, y un link para navegar onClick
const SidebarLink = (props) => {



    return (
        <div className="sidebar-link">
            <img className="sidebar-link__image" src={props.img} alt="" />
            <p className="sidebar-link">{props.text}</p>
        </div>
    )



}

export default SidebarLink;