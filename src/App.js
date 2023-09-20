import React from 'react';
import Register from './Pages/Register.jsx';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import {
  Route,
  BrowserRouter,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';


function App() {
  const {currentUser} = useContext(AuthContext);
  
  const ProtectedRoute = ({children}) => {
    if (!currentUser) return <Navigate to='/login'/>;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
