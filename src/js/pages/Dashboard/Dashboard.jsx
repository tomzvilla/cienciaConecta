// components
import DashboardInicioFeria from "../../components/Dashboard/DashboardInicioFeria"
import DashboardResponsable from "../../components/Dashboard/DashboardResponsable"
import Metadata from "../../components/Metadata/Metadata"
// hooks
import useAuth from "../../hooks/useAuth"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

const rolesInicial = ['2', '3', '4', '5']

const Dashboard = () => {
    const { auth } = useAuth()
    const [userRoles, setUserRoles] = useState({
        roles: auth.roles
    })

    const location = useLocation()

    useEffect(() => {
        if(location?.state?.newRol !== '') {
            if(location?.state?.newRol === '2' && !userRoles.roles.includes('2')) {
                const newRoles = [...userRoles.roles]
                newRoles.push('2')
                setUserRoles({
                    roles: newRoles
                })
                location.state.newRol = ''
            }
        }
      
    })
    

    console.log(userRoles)


    return (
        <>
            <Metadata title={'Feria'}/>
            <div className="dashboard">
                <h1 className="dashboard__title">Feria de Ciencia y Tecnologia {new Date().getFullYear()}</h1>
                {!rolesInicial.some(role => userRoles.roles.includes(role)) && <DashboardInicioFeria />}
                {userRoles.roles.includes('2') &&  <DashboardResponsable />}
                {userRoles.roles.includes('5') && <p>Es la comision asesora</p>}
                {userRoles.roles.includes('3') && <p>Es un evaluador</p>}
            </div>
        </>

    )

}

export default Dashboard