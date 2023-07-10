import './css/style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Import components

import Login from './js/pages/Login'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
