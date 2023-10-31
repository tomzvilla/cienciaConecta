const ROLES = {
    "Administrador": '1',
    "Responsable de Proyecto": '2',
    "Evaluador": '3',
    "Referente Evaluador": '4',
    "Comisión Asesora": '5',
    "Docente": '6',
  };


const DashboardSelector = (props) => {


    return (
        <div className="dashboard-selector">
            {
                props.roles.map((rol, k) => {
                    if (rol > 1 && rol < 6) {
                        return (
                            <div 
                            className={props.dashboardActivo === rol  ? `dashboard-selector__button dashboard-selector__button--activo` : `dashboard-selector__button`} 
                            key={rol}
                            onClick={() => props.setDashboardActivo(rol)}
                            >
                                <p>{ Object.keys(ROLES).find(key => ROLES[key] === rol) }</p>
                            </div>
                            )
                        }
                    }
                )
            } 
        </div>
    );
}


export default DashboardSelector;