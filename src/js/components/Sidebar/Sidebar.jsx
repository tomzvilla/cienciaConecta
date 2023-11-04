import SidebarLink from "./SidebarLink";
import SidebarDropdown from "../SidebarDropdown/SidebarDropdown";
// HOOKS
import useAuth from "../../hooks/useAuth";
import { useState} from "react";
import { ROLES } from '../../../App'
import { ESTADOS } from "../../../App";
import { useSelector } from "react-redux";

const Sidebar = () => {
    const { auth } = useAuth()
    const [dropdown, setDropdown] = useState({
        feria: false,
        proyectos: false,
        postulaciones: false,
    })

    // Hacer que desde layout cargue este estado y le saque el acnho a la columna
    const showSidebar = useSelector(state => state.ui.sidebar)
    const feria = useSelector(state => state.instancias.feria)

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

                <SidebarDropdown dropdown={dropdown.proyectos} img={require("../../../assets/evaluador.png")} text="Proyectos" onClick={() => toggleDropdown('proyectos')}>
                    { [ESTADOS.iniciada, ESTADOS.instanciaEscolar].includes(feria?.estado) ?  
                    <SidebarLink img={require("../../../assets/evaluador.png")} linkto={'/inscribirProyecto'} text="Inscribir proyecto" dropdown={true}/>
                    :
                    null
                    }
                    <SidebarLink img={require("../../../assets/evaluador.png")} linkto={'/misProyectos'} text="Ver proyectos" dropdown={true}/>
                </SidebarDropdown>
                <SidebarDropdown dropdown={dropdown.postulaciones} img={require("../../../assets/user.png")} text="Postulaciones" onClick={() => toggleDropdown('postulaciones')}>
                    <SidebarLink img={require("../../../assets/user.png")} linkto={'/postulacion'} text="Postularme"/>
                    {auth?.roles?.find(role => [ROLES.ComAsesora, ROLES.Admin].includes(role)) ? <SidebarLink img={require("../../../assets/user.png")} linkto={'/seleccionarPostulantes'} text="Lista Postulantes"/> : null}
                </SidebarDropdown>
                

                {/* Links de comision/admin */}
                {auth?.roles?.find(role => [ROLES.ComAsesora, ROLES.Admin].includes(role)) && 
                    <>
                        <SidebarDropdown dropdown={dropdown.feria} img={require("../../../assets/colaboracion.png")} text="Feria" onClick={() => toggleDropdown('feria')}>
                            {!feria ? <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/feria'} text="Crear Feria" dropdown={true}/> : null}
                            <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/verFeria'} text="Ver Feria" dropdown={true}/>
                            <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/verListaFerias'} text="Listado de Ferias" dropdown={true}/>
                            { [ESTADOS.creada, ESTADOS.iniciada, ESTADOS.instanciaEscolar].includes(feria?.estado) ? <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/crearCategoria'} text="Categorías" dropdown={true}/> : null }
                        </SidebarDropdown>

                        {[ESTADOS.creada, ESTADOS.iniciada, ESTADOS.instanciaEscolar, ESTADOS.instanciaEscolar_Finalizada].includes(feria?.estado) ? <SidebarLink img={require("../../../assets/user.png")} linkto={'/asignarReferentes'} text="Asignar Referentes"/> : null }
                        {[ESTADOS.instanciaRegional_ExposicionFinalizada, ESTADOS.instanciaProvincial_ExposicionFinalizada].includes(feria?.estado) ? <SidebarLink img={require("../../../assets/user.png")} linkto={'/promoverProyectos'} text="Promover Proyectos"/> : null }
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