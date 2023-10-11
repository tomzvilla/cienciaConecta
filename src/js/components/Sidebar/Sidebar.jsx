import SidebarLink from "./SidebarLink";
import SidebarDropdown from "./SidebarDropdown";
// HOOKS
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { ROLES } from '../../../App'
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { auth } = useAuth()
    const [dropdown, setDropdown] = useState({
        feria: false,
        proyectos: false,
    })

    const showSidebar = useSelector(state => state.ui.sidebar)

    const toggleDropdown = (type) => {
        setDropdown({
            ...dropdown,
            [type]: !dropdown[type],
        })
    }

    return (
        <nav className={`sidebar${showSidebar ? ' show' : ''}`}>
            <div className="sidebar__link-container">
                {/* Links publicos  */}
                <SidebarLink img={require("../../../assets/trofeo.png")} linkto={'/dashboard'} text="Inicio"/>
                <>
                        <SidebarDropdown dropdown={dropdown.proyectos} img={require("../../../assets/evaluador.png")} text="Proyectos" onClick={() => toggleDropdown('proyectos')} />
                        {
                            dropdown.proyectos && <div className={`sidebar__dropdown-content`}>
                                <SidebarLink img={require("../../../assets/evaluador.png")} linkto={'/inscribirProyecto'} text="Inscribir proyecto"/>
                                <SidebarLink img={require("../../../assets/evaluador.png")} linkto={'/misProyectos'} text="Ver proyectos"/>
                            </div>
                        }
                        
                        
                    </> 
                <SidebarLink img={require("../../../assets/user.png")} linkto={'/postulacion'} text="Postulaciones"/>

                {/* Links de comision/admin */}
                {auth?.roles?.find(role => [ROLES.ComAsesora, ROLES.Admin].includes(role)) && 
                    <>
                        <SidebarLink img={require("../../../assets/user.png")} linkto={'/seleccionarPostulantes'} text="Lista Postulantes"/>
                        <SidebarDropdown dropdown={dropdown.feria} img={require("../../../assets/colaboracion.png")} text="Feria" onClick={() => toggleDropdown('feria')} />
                        {
                            dropdown.feria && <div className={`sidebar__dropdown-content`}>
                                <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/feria'} text="Crear Feria"/>
                                <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/verFeria'} text="Ver Feria"/>
                                <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/verListaFerias'} text="Listado de Ferias"/>
                            </div>
                        }
                        
                        <SidebarLink img={require("../../../assets/user.png")} linkto={'/seleccionarPostulantes'} text="Lista Postulantes"/>
                        <SidebarLink img={require("../../../assets/user.png")} linkto={'/asignarReferentes'} text="Referentes"/>
                    </> 
                }
                {/* Links de evaluadores */}
                
                {auth?.roles?.find(role => [ROLES.Evaluador].includes(role)) && 
                    <>
                        <SidebarLink img={require("../../../assets/user.png")} linkto={'/evaluar'} text="Evaluacion"/>
                    </>
                }

            </div>
            
        </nav>
    )



}

export default Sidebar;