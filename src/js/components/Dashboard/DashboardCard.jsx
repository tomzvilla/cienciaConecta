import { Link, useLocation } from "react-router-dom"

const DashboardCard = (props) => {

    const {src, title, link, userRoles, setUserRoles} = props

    const location = useLocation()

    return (
        <div>
            <img src={src} alt="imagen de card" />
            <Link to={link} state={{from: `${location.pathname}`}} >
                <h2> {title} </h2>
            </Link>
        </div>
    )

}

export default DashboardCard