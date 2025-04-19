import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';
import Receitas from '../pages/Receitas';
import Despesas from '../pages/Despesas';
import Perfil from '../pages/Perfil';


const isAuthenticated = () => !!localStorage.getItem('token');

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />}
        />

        <Route
        path="/receitas"
        element={isAuthenticated() ? <Receitas /> : <Navigate to="/" />}
        />

        <Route
        path="/despesas"
        element={isAuthenticated() ? <Despesas /> : <Navigate to="/" />}
        />

        <Route
        path="/perfil"
        element={isAuthenticated() ? <Perfil /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
