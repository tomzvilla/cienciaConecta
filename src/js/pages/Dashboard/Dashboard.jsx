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
import { useEffect, useState, useRef } from "react"
import useRefreshToken from "../../hooks/useRefreshToken"
import { useSelector, useDispatch } from "react-redux"
import useAxiosFetch from "../../hooks/useAxiosFetch"
import useAxiosPrivate from "../../hooks/useAxiosPrivate"
import useCategoriasNiveles from "../../hooks/useCategoriasNiveles"
import { nivelesActions } from "../../../store/niveles-slice"
import { categoriasActions } from "../../../store/categorias-slice"

const rolesInicial = ['2', '3', '4', '5']

const Dashboard = () => {
    const { auth } = useAuth()
    const refresh = useRefreshToken()
    const axiosPrivate = useAxiosPrivate()
    const dispatch = useDispatch()
    const location = useLocation()

    const [userRoles, setUserRoles] = useState({
        roles: auth.roles
    })
    const [loadingRoles, setLoadingRoles] = useState(false)

    const nroProyectos = useSelector(state => state.instancias.nroProyectos)
    const categoriasState = useSelector(state => state.categorias.categorias)
    const nivelesState = useSelector(state => state.niveles.niveles)

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

    const { data: categoriasData, isLoading: loadingCategorias } = useAxiosFetch('/categoria', axiosPrivate, nivelesState.length !== 0)
    const { data: nivelesData, isLoading: loadingNiveles } = useAxiosFetch('/nivel', axiosPrivate, categoriasState.length !== 0)

    const { niveles, categorias } = useCategoriasNiveles({ categoriaData: categoriasData, nivelData: nivelesData, enabled: !loadingNiveles && !loadingCategorias })

    if(nivelesState.length === 0 && categoriasState.length === 0 && !loadingNiveles && !loadingCategorias) {
        dispatch(nivelesActions.cargarNiveles(niveles))
        dispatch(categoriasActions.cargarCategorias(categorias))
    }

    return (
        (loadingRoles && ((categoriasState.length !== 0 && nivelesState.length !== 0) || (loadingCategorias && loadingNiveles))) ?
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