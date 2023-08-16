import { Link } from "react-router-dom"

const DashboardCard = (props) => {

    const {src, title, link, userRoles, setUserRoles} = props

    return (
        <div>
            <img src={src} alt="imagen de card" />
            <Link to={link} state={{userRoles: userRoles, setUserRoles: setUserRoles} } >
                <h2> {title} </h2>
            </Link>
        </div>
    )

}

export default DashboardCard