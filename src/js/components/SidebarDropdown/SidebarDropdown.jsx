import SidebarDropdownLink from './SidebarDropdownLink';

// Recibe una imagen, un texto, y un link para navegar onClick
const SidebarDropdown = (props) => {

    return (
        <>
            <SidebarDropdownLink onClick={props.onClick} img={props.img} text={props.text} dropdown={props.dropdown}/>
            {props.dropdown && <div className={`sidebar__dropdown-content`}>  {props.children} </div>}
        </>
    )

}

export default SidebarDropdown;