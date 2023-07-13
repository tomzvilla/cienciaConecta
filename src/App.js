import './css/style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Import components

import Login from './js/pages/Login'
import Signup from './js/pages/Signup'
import Home from './js/pages/Home'
import Unauthorized from './js/pages/Unauthorized'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/unauthorized' element={<Unauthorized/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
