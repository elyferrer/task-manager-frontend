import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './features/users/Home';
import Login from './features/users/Login'
import PrivateRoutes from './features/components/PrivateRoutes';
import Register from './features/users/Register';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" exact />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
