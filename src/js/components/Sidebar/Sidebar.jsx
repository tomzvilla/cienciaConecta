import SidebarLink from "./SidebarLink";


const Sidebar = () => {

    return (
        <nav className="sidebar">
            <div className="sidebar__link-container">
                <SidebarLink img={require("../../../assets/trofeo.png")} linkto={'/dashboard'} text="Inicio"/>
                <SidebarLink img={require("../../../assets/evaluador.png")} linkto={'/myprojects'} text="Proyectos"/>

                <SidebarLink img={require("../../../assets/colaboracion.png")} linkto={'/feria'} text="Feria"/>

                <SidebarLink img={require("../../../assets/user.png")} linkto={'/postulacion'} text="Postulaciones"/>
                <SidebarLink img={require("../../../assets/user.png")} linkto={'/seleccionarPostulantes'} text="Lista Postulantes"/>
                <SidebarLink img={require("../../../assets/user.png")} linkto={'/evaluar'} text="Evaluacion"/>

            </div>
            
        </nav>
    )



}

export default Sidebar;