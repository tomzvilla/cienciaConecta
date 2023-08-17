import './css/style.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import useAuth from './js/hooks/useAuth'

// Import components
import RequireAuth from './js/components/RequireAuth/RequireAuth'
import PersistLogin from './js/components/PersistLogin/PersistLogin'

import Login from './js/pages/Login'
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
import Dashboard from './js/pages/Dashboard/Dashboard'

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
  const { auth } = useAuth()
  return (
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='login' element={auth ? <Login/> : <Navigate  to={'/dashboard'}/>}/>
          <Route path='home' element={auth ? <Home/> :<Navigate  to={'/dashboard'}/>}/>
          <Route path='signup' element={auth ? <Signup/> : <Navigate  to={'/dashboard'}/> }/>
          <Route path='unauthorized' element={<Unauthorized/>}/>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.ResponsableProyecto, ROLES.Evaluador, ROLES.RefEvaluador, ROLES.ComAsesora, ROLES.Docente]}/>}>
              {/* Rutas para proyectos */}
              <Route path='projects' element={<InscribirEtapaEscolar/>}/>
              <Route path='projects/:id' element={<VisualizarProyecto/>}/>
              <Route path='editProjects/:id' element={<ActualizarProyecto/>}/>
              <Route path='myprojects' element={<VisualizarListadoProyectos/>}/>
              <Route path='dashboard' element={<Dashboard/>}/>
            </Route>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.ComAsesora]}/>}>
              {/* Rutas para feria */}
              <Route path='feria' element={<CrearFeria/>}/>
            </Route>
          </Route>

          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
  );
}

export default App;
