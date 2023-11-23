import { useSelector } from 'react-redux';
import SidebarDropdownLink from './SidebarDropdownLink';
import { useEffect } from 'react';

// Recibe una imagen, un texto, y un link para navegar onClick
const SidebarDropdown = (props) => {
    const showSidebar = useSelector(state => state.ui.sidebar)

    let dropdown = !showSidebar ? props.dropdown : false;

    return (
        <>
            <SidebarDropdownLink onClick={props.onClick} img={props.img} text={props.text} dropdown={props.dropdown}/>
            {dropdown && <div className={`sidebar__dropdown-content`}>  {props.children} </div>}
        </>
    )

}

export default SidebarDropdown;