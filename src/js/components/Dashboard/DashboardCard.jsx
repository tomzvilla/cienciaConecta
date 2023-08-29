import { Link, useLocation } from "react-router-dom"

const DashboardCard = (props) => {

    const {src, title, link, userRoles, setUserRoles} = props

    const location = useLocation()

    return (
        <Link to={link} state={{from: `${location.pathname}`}} className="dashboard-card__link">
            <div className="dashboard-card">
                <img src={src} alt="imagen de card" className="dashboard-card__img"/>
            
                    <h6 className="dashboard-card__text"> {title} </h6>
                
            </div>
        </Link>
    )

}

export default DashboardCard