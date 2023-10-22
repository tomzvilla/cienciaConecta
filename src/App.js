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
import Categorias from './js/pages/Categorias'

// DEV
import Card from './js/components/Card/Card'
import AuthVerify from './js/components/PersistLogin/AuthVerify'
import ConfirmarCuenta from './js/pages/Usuarios/ConfirmarCuenta'
import VisualizarListadoPendienteActivacion from './js/pages/Usuarios/VisualizarListadoPendienteActivacion'
import VisualizarUsuarioPendienteActivacion from './js/pages/Usuarios/VisualizarUsuarioPendienteActivacion'


// ROLES

export const ROLES = {
  Admin: '1',
  ResponsableProyecto: '2',
  Evaluador: '3',
  RefEvaluador: '4',
  ComAsesora: '5',
  Docente: '6',
};

function App() {
  return (
    <>
      <Routes>
        <Route element={<PersistLoginInverse />}>
          <Route path='home' element={<Home/>}/>
          <Route path='/' element={<Home/>} />
          <Route path='/unauthorized' element={<Unauthorized/>}/>
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
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.ResponsableProyecto, ROLES.Evaluador, ROLES.RefEvaluador, ROLES.ComAsesora, ROLES.Docente]}/>}>
              {/* Rutas para proyectos */}
              <Route path='/inscribirProyecto' element={<InscribirEtapaEscolar/>}/>
              <Route path='/proyecto/:id' element={<VisualizarProyecto/>}/>
              <Route path='/editarProyecto/:id' element={<ActualizarProyecto/>}/>
              <Route path='/misProyectos' element={<VisualizarListadoProyectos/>}/>
              <Route path='/dashboard' element={<Dashboard/>}/>
              <Route path='/postulacion' element={<Postulacion/>}/>
              <Route path='/evaluar' element={<ListadoEvaluaciones/>}/>
              <Route path='/evaluar/:id' element={<EvaluacionCard/>}/>
              <Route path='/evaluar/:id/iniciar' element={<Evaluacion/>}/>
              {/* Rutas para perfil de usuarios */}
              <Route path='/perfil' element={<Profile/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.ComAsesora]}/>}>
              {/* Rutas para feria */}
              <Route path='/feria' element={<CrearFeria/>}/>
              <Route path='/verFeria' element={<VisualizarFeriaActual/>}/>
              <Route path='/verListaFerias' element={<VisualizarListadoFerias/>}/>
              <Route path='/editarFeria' element={<ActualizarFeria/>}/>
              <Route path='/crearCategoria' element={<Categorias/>}/>
              {/* Rutas para postulantes */}
              <Route path='/seleccionarPostulantes' element={<SeleccionPostulantes/>}/>
              <Route path='/postulante/:id' element={<VisualizarPostulante/>}/>
              <Route path='/activarUsuarios' element={<VisualizarListadoPendienteActivacion/>}/>
              <Route path='/usuarioPendienteActivacion/:id' element={<VisualizarUsuarioPendienteActivacion/>}/> 
              {/* Rutas para referentes */}
              <Route path='/asignarReferentes' element={<AsignarReferentes/>}/>
              <Route path='/promoverProyectos' element={<PromoverProyectos/>}/>
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
            <Route path='*' element={<NotFound/>}/>
          </Route>

        </Route>
      </Routes>
      <AuthVerify />
    </>
  );
}

export default App;
