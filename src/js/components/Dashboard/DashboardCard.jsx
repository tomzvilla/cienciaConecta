import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"

const DashboardCard = (props) => {

    const {src, title, link} = props
    const feria = useSelector(state => state.instancias.feria)

    const location = useLocation()

    const showAlert = () => {
        Swal.fire({
            title: 'Oops!',
            text: 'Todavía no puedes hacer esto, la feria aún no ha comenzado.',
            icon: 'warning',
            confirmButtonText: 'OK',
            confirmButtonColor: '#00ACE6',
        })
    }

    return (
        feria ?
        <Link to={link} state={{from: `${location.pathname}`}} className="dashboard-card__link">
            <div className="dashboard-card">
                <img src={src} alt="imagen de card" className="dashboard-card__img"/>
            
                    <h6 className="dashboard-card__text"> {title} </h6>
                
            </div>
        </Link>
        :
        <Link onClick={showAlert} className="dashboard-card__link">
            <div className="dashboard-card">
                <img src={src} alt="imagen de card" className="dashboard-card__img"/>
            
                    <h6 className="dashboard-card__text"> {title} </h6>
                
            </div>
        </Link>
    )

}

export default DashboardCard