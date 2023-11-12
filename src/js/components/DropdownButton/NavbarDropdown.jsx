import { useEffect, useState } from "react";

const NavbarDropdown = (props) => {
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        const delay = setTimeout(() => {
          setAnimate(true);
        }, 30);
    
        return () => clearTimeout(delay);
      }, []);

    return (
        <ul ref={props.menuRef} className={ animate ? `dropdown-navbar dropdown-navbar--animate`: `dropdown-navbar`}>  
            <li className="dropdown-navbar__item" onClick={props.navigatePerfil}> 
                <p>Ver perfil</p>
            </li> 
            <li className="dropdown-navbar__item" onClick={props.navigatePerfil}>
                <p>Cambiar contraseña</p>
            </li>
            <li className="dropdown-navbar__item" onClick={props.signOut}>
                <p>Salir</p> 
            </li>   
        </ul>
    )

}

export default NavbarDropdown;