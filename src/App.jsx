import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './features/users/Home';
import Login from './features/users/Login'
import PrivateRoutes from './features/components/PrivateRoutes';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            
          </Route>
          <Route element={<Home />} path="/" exact />
          <Route element={<Login />} path="/login" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
