import './css/style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Import components

import Login from './js/pages/Login'
import Signup from './js/pages/Signup'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
