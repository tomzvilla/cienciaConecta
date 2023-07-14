import './css/style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Import components
import RequireAuth from './js/components/RequireAuth/RequireAuth'

import Login from './js/pages/Login'
import Signup from './js/pages/Signup'
import Home from './js/pages/Home'
import Unauthorized from './js/pages/Unauthorized'
import NotFound from './js/pages/NotFound'
import Projects from './js/pages/Projects'

// ROLES

export const ROLES = {
  Admin: 1,
  ResponsableProyecto: 2,
  Evaluador: 3,
  RefEvaluador: 4,
  ComAsesora: 5,
  Docente: 6,
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/unauthorized' element={<Unauthorized/>}/>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.ResponsableProyecto, ROLES.Evaluador, ROLES.RefEvaluador, ROLES.ComAsesora, ROLES.Docente]}/>}>
            <Route path='/projects' element={<Projects/>}/>
          </Route>

          <Route path='*' element={<NotFound/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
