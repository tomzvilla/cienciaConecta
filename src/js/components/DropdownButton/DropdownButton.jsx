import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";

const DropdownButton = (props) => {
    const menuRef = useRef(null);
    const dispatch = useDispatch()

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
          dispatch(uiActions.toggleNavbarMenu());
        }
      };
    
      useEffect(() => {
        if (props.dropdown) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [props.dropdown]);

    return (
        <>
            <div className="sidebar-link sidebar-link" onClick={props.onClick}>
                <img className="sidebar-link__image" src={props.img} alt="Perfil" />
            </div>
            {props.dropdown && <ul ref={menuRef} className={`dropdown-navbar__content`}>  <li className="dropdown-navbar__content--item"> {props.children} </li> </ul>}
        </>
    )

}

export default DropdownButton