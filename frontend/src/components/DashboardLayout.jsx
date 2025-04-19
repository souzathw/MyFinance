import { Link, useNavigate } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-danger text-white p-4 sidebar">
        <h4 className="fw-bold mb-4">MyFinance</h4>
        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/dashboard" className="nav-link text-white">Dashboard</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/receitas" className="nav-link text-white">Receitas</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/despesas" className="nav-link text-white">Despesas</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/perfil" className="nav-link text-white">Perfil</Link>
          </li>
          <li className="nav-item mt-4">
            <button onClick={handleLogout} className="btn btn-outline-light w-100">
              Sair
            </button>
          </li>
        </ul>
      </div>

      {/* Conteúdo */}
      <div className="flex-grow-1 p-5 bg-light content-area">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
