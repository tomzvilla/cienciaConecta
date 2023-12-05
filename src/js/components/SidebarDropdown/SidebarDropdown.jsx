import { useDispatch, useSelector } from 'react-redux';
import SidebarDropdownLink from './SidebarDropdownLink';
import { uiActions } from "../../../store/ui-slice";

// Recibe una imagen, un texto, y un link para navegar onClick
const SidebarDropdown = (props) => {
    const showSidebar = useSelector(state => state.ui.sidebar)
    const dispatch = useDispatch()

    let dropdown = !showSidebar ? props.dropdown : false;

    const openSidebar = () => {  
        if (showSidebar) {
            dispatch(uiActions.showSidebar())
        }
        props.onClick()
    }

    return (
        <>
            <SidebarDropdownLink onClick={openSidebar} img={props.img} text={props.text} dropdown={dropdown}/>
            {dropdown && <div className={`sidebar__dropdown-content`}>  {props.children} </div>}
        </>
    )
}

export default SidebarDropdown;