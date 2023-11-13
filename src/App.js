import './css/style.css'
import { Route, Routes } from 'react-router-dom'

// Import components
import RequireAuth from './js/components/RequireAuth/RequireAuth'
import PersistLogin from './js/components/PersistLogin/PersistLogin'
import PersistLoginInverse from './js/components/PersistLogin/PersistLoginInverse'

import LoginPage from './js/pages/LoginPage'
import Signup from './js/pages/Signup'
import Home from './js/pages/Home'
import Layout from './js/pages/Layout'
import Unauthorized from './js/pages/Unauthorized'
import NotFound from './js/pages/NotFound'
import InscribirEtapaEscolar from './js/pages/Projects/InscribirEtapaEscolar'
import VisualizarListadoProyectos from './js/pages/Projects/VisualizarListadoProyectos'
import ActualizarProyecto from './js/pages/Projects/ActualizarProyecto'
import VisualizarProyecto from './js/pages/Projects/VisualizarProyecto'
import CrearFeria from './js/pages/Ferias/CrearFeria'
import VisualizarFeriaActual from './js/pages/Ferias/VisualizarFeriaActual'
import VisualizarListadoFerias from './js/pages/Ferias/VisualizarListadoFerias'
import Dashboard from './js/pages/Dashboard/Dashboard'
import ActualizarFeria from './js/pages/Ferias/ActualizarFeria'
import Postulacion from './js/pages/Evaluadores/Postulacion'
import SeleccionPostulantes from './js/pages/Evaluadores/SeleccionPostulantes'
import VisualizarPostulante from './js/components/Postulacion/VisualizarPostulante'
import ListadoEvaluaciones from './js/pages/Evaluacion/ListadoEvaluaciones'
import EvaluacionCard from './js/components/Evaluacion/EvaluacionCard'
import Evaluacion from './js/pages/Evaluacion/Evaluacion'
import ListadoProyectosAsignados from './js/pages/Referentes/ListadoProyectosAsignados'
import ProyectoAsignarEvaluadores from './js/pages/Referentes/ProyectoAsignarEvaluadores'
import AsignarReferentes from './js/pages/Referentes/AsignarReferentes'
import RecuperarCredenciales from './js/pages/RecuperarCredenciales'
import IngresarCredenciales from './js/pages/IngresarCredenciales'
import Profile from './js/pages/Profile'
import PromoverProyectos from './js/pages/PromoverProyectos/PromoverProyectos'
import PromoverProyectosNacional from './js/pages/PromoverProyectos/PromoverProyectosNacional'
import Categorias from './js/pages/Categorias'
import EvaluacionCardConsulta from './js/components/Evaluacion/EvaluacionCardConsulta'
import EvaluacionFormConsulta from './js/components/Evaluacion/EvaluacionFormConsulta'
// DEV
import AuthVerify from './js/components/PersistLogin/AuthVerify'
import ConfirmarCuenta from './js/pages/Usuarios/ConfirmarCuenta'
import VisualizarListadoPendienteActivacion from './js/pages/Usuarios/VisualizarListadoPendienteActivacion'
import VisualizarUsuarioPendienteActivacion from './js/pages/Usuarios/VisualizarUsuarioPendienteActivacion'

import { useSelector } from 'react-redux'

// ROLES

export const ROLES = {
  Admin: '1',
  ResponsableProyecto: '2',
  Evaluador: '3',
  RefEvaluador: '4',
  ComAsesora: '5',
  Docente: '6',
};

export const ESTADOS = {
  creada: '0',
  iniciada: '1',
  instanciaEscolar: '2',
  instanciaEscolar_Finalizada: '3',
  instanciaRegional_EnEvaluacion: '4',
  instanciaRegional_EvaluacionFinalizada: '5',
  instanciaRegional_EnExposicion: '6',
  instanciaRegional_ExposicionFinalizada: '7',
  proyectosPromovidosA_instanciaProvincial: '8',
  instanciaProvincial_EnExposicion: '9',
  instanciaProvincial_ExposicionFinalizada: '10',
  proyectosPromovidosA_instanciaNacional: '11',
  finalizada: '12',
};

export const instanciaEscolar = [ESTADOS.iniciada, ESTADOS.instanciaEscolar]
export const instanciaPromocion = [ESTADOS.instanciaRegional_ExposicionFinalizada, ESTADOS.instanciaProvincial_ExposicionFinalizada]

function App() {

  const feria = useSelector(state => state.instancias.feria)

  return (
    <>
      <Routes>
        <Route element={<PersistLoginInverse />}>
          <Route path='home' element={<Home/>}/>
          <Route path='/' element={<Home/>} />
        </Route>

        <Route element={<Layout />}>
          <Route element={<PersistLoginInverse />}>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/confirmar/:token' element={<ConfirmarCuenta/>}/>
            <Route path='/recuperarCredenciales' element={<RecuperarCredenciales />}/>
            <Route path='/reestablecerCredenciales/:token' element={<IngresarCredenciales />}/>

          </Route>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth 
              allowedRoles={[ ROLES.ResponsableProyecto, ROLES.Evaluador, ROLES.Docente]} 
              allowedStates={[ESTADOS.iniciada, ESTADOS.instanciaEscolar]}/>}
            >
              <Route path='/inscribirProyecto' element={<InscribirEtapaEscolar/>}/> 
            </Route>
            <Route element={<RequireAuth allowedRoles={[ ROLES.ResponsableProyecto, ROLES.Evaluador, ROLES.Docente]} />}>
              <Route path='/misProyectos' element={<VisualizarListadoProyectos/>}/>
            </Route>

            <Route element={<RequireAuth 
              allowedRoles={[ROLES.Admin, ROLES.ResponsableProyecto, ROLES.Evaluador, ROLES.RefEvaluador, ROLES.ComAsesora, ROLES.Docente]} 
              allowedStates={[ESTADOS.iniciada, ESTADOS.instanciaEscolar, ESTADOS.instanciaEscolar_Finalizada ]}/>}
            >
              <Route path='/editarProyecto/:id' element={<ActualizarProyecto/>}/> 
            </Route>
            <Route element={<RequireAuth allowedRoles={[ ROLES.Evaluador, ROLES.RefEvaluador]}/>}>
              <Route path='/evaluar' element={<ListadoEvaluaciones/>}/>
              <Route path='/evaluar/:id' element={<EvaluacionCard/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.ResponsableProyecto, ROLES.Evaluador, ROLES.RefEvaluador, ROLES.ComAsesora, ROLES.Docente]}/>}>
              {/* Rutas con auth liberadas de estados */}
              
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/proyecto/:id' element={<VisualizarProyecto/>}/>
              <Route path='/perfil' element={<Profile/>}/>

              <Route path='/evaluar/:id/iniciar' element={<Evaluacion/>}/>
              <Route path='/evaluacion/:id' element={<EvaluacionCardConsulta />}/>
              <Route path='/evaluacion/:id/consultar' element={<EvaluacionFormConsulta />}/>

            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.ResponsableProyecto, ROLES.Docente]}/>}>
              {/* Rutas con auth liberadas de estados */}
              <Route path='/postulacion' element={<Postulacion/>}/> {/*Se maneja por fecha */}
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.ComAsesora]} allowedStates={[ESTADOS.creada, ESTADOS.iniciada, ESTADOS.instanciaEscolar]}/>}>
              <Route path='/crearCategoria' element={<Categorias/>}/>
            </Route>
          

            <Route element={<RequireAuth 
              allowedRoles={[ROLES.Admin, ROLES.ComAsesora]}/>}
            >
              {/* Rutas liberadas */}
              {!feria && <Route path='/feria' element={<CrearFeria/>}/>}
              <Route path='/verFeria' element={<VisualizarFeriaActual/>}/>
              <Route path='/verListaFerias' element={<VisualizarListadoFerias/>}/>
              <Route path='/editarFeria' element={<ActualizarFeria/>}/>
              <Route path='/activarUsuarios' element={<VisualizarListadoPendienteActivacion/>}/>
              <Route path='/usuarioPendienteActivacion/:id' element={<VisualizarUsuarioPendienteActivacion/>}/> 
              {/* Rutas para postulantes, liberadas por estado, se manejan por fecha */}
              <Route path='/seleccionarPostulantes' element={<SeleccionPostulantes/>}/>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.ComAsesora, ROLES.RefEvaluador]} />}>
            <Route path='/postulante/:id' element={<VisualizarPostulante/>}/>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.ComAsesora]} allowedStates={[ESTADOS.creada, ESTADOS.iniciada, ESTADOS.instanciaEscolar, ESTADOS.instanciaEscolar_Finalizada]}/>}>
              <Route path='/asignarReferentes' element={<AsignarReferentes/>}/>
            </Route>

            <Route element={<RequireAuth 
              allowedRoles={[ROLES.Admin, ROLES.ComAsesora]}
              allowedStates={instanciaPromocion}/>}
            >
              <Route path='/promoverProyectos' element={feria?.estado === ESTADOS.instanciaRegional_ExposicionFinalizada ? <PromoverProyectos/> : <PromoverProyectosNacional /> }/>
            </Route>
            
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.RefEvaluador]}/>}>
              {/* Rutas para referentes */}
              <Route path='/proyectosParaAsignar' element={<ListadoProyectosAsignados />}/>
              <Route path='/proyectosParaAsignar/asignar/:id' element={<ProyectoAsignarEvaluadores />}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.RefEvaluador, ROLES.ComAsesora]}/>}>
              {/* Rutas para referentes */}
              <Route path='/postulante/:id' element={<VisualizarPostulante/>}/>
            </Route>
            <Route path='/unauthorized' element={<Unauthorized/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Route>

        </Route>
      </Routes>
      <AuthVerify />
    </>
  );
}

export default App;
