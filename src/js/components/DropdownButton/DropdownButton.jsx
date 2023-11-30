import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../../../store/ui-slice";
import NavbarDropdown from "./NavbarDropdown";

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
            <div className="dropdown-button" onClick={props.onClick}>
                <img className="dropdown-button__image" src={props.img} alt="Perfil" />
            </div>
            
            {props.dropdown && <NavbarDropdown navigateChangePassword={props.navigateChangePassword} navigatePerfil={props.navigatePerfil} signOut={props.signOut} menuRef={menuRef}/>}
        </>
    )

}

export default DropdownButton