import './css/style.css'
import { Route, Routes } from 'react-router-dom'

// Import components
import RequireAuth from './js/components/RequireAuth/RequireAuth'
import PersistLogin from './js/components/PersistLogin/PersistLogin'

import Login from './js/pages/Login'
import Signup from './js/pages/Signup'
import Home from './js/pages/Home'
import Layout from './js/pages/Layout'
import Unauthorized from './js/pages/Unauthorized'
import NotFound from './js/pages/NotFound'
import RegisterSchoolStage from './js/pages/Projects/RegisterSchoolStage'
import ViewUserProjects from './js/pages/Projects/ViewUserProjects'
import EditProject from './js/pages/Projects/EditProject'
import ViewProject from './js/pages/Projects/ViewProject'

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
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='login' element={<Login/>}/>
          <Route path='home' element={<Home/>}/>
          <Route path='signup' element={<Signup/>}/>
          <Route path='unauthorized' element={<Unauthorized/>}/>
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.ResponsableProyecto, ROLES.Evaluador, ROLES.RefEvaluador, ROLES.ComAsesora, ROLES.Docente]}/>}>
              <Route path='projects' element={<RegisterSchoolStage/>}/>
              <Route path='projects/:id' element={<ViewProject/>}/>
              <Route path='editProjects/:id' element={<EditProject/>}/>
              <Route path='myprojects' element={<ViewUserProjects/>}/>
            </Route>
          </Route>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
  );
}

export default App;
