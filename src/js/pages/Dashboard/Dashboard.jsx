// components
import DashboardInicioFeria from "../../components/Dashboard/DashboardInicioFeria"
import DashboardResponsable from "../../components/Dashboard/DashboardResponsable"
import DashboardEvaluador from "../../components/Dashboard/DashboardEvaluador"
import DashboardComisionAsesora from "../../components/Dashboard/DashboardComisionAsesora"
import DashboardReferente from "../../components/Dashboard/DashboardReferente"
import DashboardSelector from "../../components/Dashboard/DashboardSelector"
import Spinner from "../../components/Spinner/Spinner"
import Metadata from "../../components/Metadata/Metadata"
// hooks
import useAuth from "../../hooks/useAuth"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import useRefreshToken from "../../hooks/useRefreshToken"
import { useSelector } from "react-redux"

const rolesInicial = ['2', '3', '4', '5']

const Dashboard = () => {
    const { auth } = useAuth()
    const refresh = useRefreshToken()
    const location = useLocation()

    const [userRoles, setUserRoles] = useState({
        roles: auth.roles
    })
    const [loadingRoles, setLoadingRoles] = useState(false)

    const nroProyectos = useSelector(state => state.instancias.nroProyectos)

    const [dashboardActivo, setDashboardActivo] = useState(userRoles.roles.find(rol => rol !== "1" && rol !== "6"))

    const validateRefreshToken = async () => {
        try {
            await refresh()
        } catch (err) {
            console.log(err)
        }
    }

    const validateNewRoles = () => {
        if(location?.state?.newRol === '2' && !userRoles.roles.includes('2')) {
            const newRoles = [...userRoles.roles, '2']
            setUserRoles({
                roles: newRoles
            })
            location.state.newRol = ''
            setDashboardActivo('2')
        }
        if(!nroProyectos && nroProyectos === 0) {
            const newRoles = [...userRoles.roles].filter(r => r !== '2')
            setUserRoles({
                roles: newRoles
            })
        }
        setLoadingRoles(false)
    }

    useEffect(() => {
        const ejecutar = async () => {
            setLoadingRoles(true)
            await validateRefreshToken()
            validateNewRoles()
        }
        ejecutar()
    }, [])

    return (
        loadingRoles ?
        <Spinner />
        :
        <>
            <Metadata title={'Feria'}/>
            <div className="dashboard">
                <h1 className="dashboard__title">Feria de Ciencias y Tecnología {new Date().getFullYear()}</h1>
                {!rolesInicial.some(role => userRoles.roles.includes(role)) ?
                    <DashboardInicioFeria /> 
                    : 
                    <>
                        <DashboardSelector roles={userRoles.roles} dashboardActivo={dashboardActivo} setDashboardActivo={setDashboardActivo}/>

                        {dashboardActivo === "4" ? <DashboardReferente /> : 
                        
                        dashboardActivo === "2" ? <DashboardResponsable /> : 

                        dashboardActivo === "3" ? <DashboardEvaluador /> : 

                        dashboardActivo === "5" ? <DashboardComisionAsesora /> : ""
                        
                        }
                    </>
            
                }
            </div>
        </>

    )

}

export default Dashboard