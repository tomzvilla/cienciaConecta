import SidebarLink from "./SidebarLink";
import SidebarDropdown from "../SidebarDropdown/SidebarDropdown";
// HOOKS
import useAuth from "../../hooks/useAuth";
import { useState} from "react";
import { ROLES } from '../../../App'
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { auth } = useAuth()
    const [dropdown, setDropdown] = useState({
        feria: false,
        proyectos: false,
    })

    // Hacer que desde layout cargue este estado y le saque el acnho a la columna
    const showSidebar = useSelector(state => state.ui.sidebar)

    const toggleDropdown = (type) => {
        setDropdown({
            ...dropdown,
            [type]: !dropdown[type],
        })
    }

    return (
        <nav className={!showSidebar ? 'sidebar sidebar--show' : 'sidebar'}>
            <div className="sidebar__link-container">
                {/* Links publicos  */}
                <SidebarLink img={require("../../../assets/trofeo.png")} linkto={'/dashboard'} text="Inicio"/>
                  
                    <>
                        <SidebarDropdown dropdown={dropdown.proyectos} img={require("../../../assets/evaluador.png")} text="Proyectos" onClick={() => toggleDropdown('proyectos')}>
                            <SidebarLink img={require("../../../assets/evaluador.png")} linkto={'/inscribirProyecto'} text="Inscribir proyecto" dropdown={true}/>
                            <SidebarLink img={require("../../../assets/evaluador.png")} linkto={'/misProyectos'} text="Ver proyectos" dropdown={true}/>
                        </SidebarDropdown>
                    </> 

                <SidebarLink img={require("../../../assets/user.png")} linkto={'/postulacion'} text="Postulaciones"/>

                {/* Links de comision/admin */}
                {auth?.roles?.find(role => [ROLES.ComAsesora, ROLES.Admin].includes(role)) && 
                    <>
                        <SidebarDropdown dropdown={dropdown.feria} img={require("../../../assets/colaboracion.png")} text="Feria" onClick={() => toggleDropdown('feria')}>
                            <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/feria'} text="Crear Feria" dropdown={true}/>
                            <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/verFeria'} text="Ver Feria" dropdown={true}/>
                            <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/verListaFerias'} text="Listado de Ferias" dropdown={true}/>
                            <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/crearCategoria'} text="Categorías" dropdown={true}/>
                        </SidebarDropdown>

                        <SidebarLink img={require("../../../assets/user.png")} linkto={'/asignarReferentes'} text="Referentes"/>
                        <SidebarLink img={require("../../../assets/user.png")} linkto={'/seleccionarPostulantes'} text="Lista Postulantes"/>
                        <SidebarLink img={require("../../../assets/user.png")} linkto={'/promoverProyectos'} text="Promover Proyectos"/>
                        <SidebarLink img={require("../../../assets/user.png")} linkto={'/activarUsuarios'} text="Activar Usuarios"/>

                    </> 
                }
                {/* Links de evaluadores */}
                
                {auth?.roles?.find(role => [ROLES.Evaluador].includes(role)) && 
                    <>
                        <SidebarLink img={require("../../../assets/pantalla.png")} linkto={'/evaluar'} text="Evaluación"/>
                    </>
                }
                {auth?.roles?.find(role => [ROLES.RefEvaluador].includes(role)) && 
                    <>
                        <SidebarLink img={require("../../../assets/user.png")} linkto={'/proyectosParaAsignar'} text="Asignar Proyectos"/>
                    </>
                }

            </div>
            
        </nav>
    )



}

export default Sidebar;