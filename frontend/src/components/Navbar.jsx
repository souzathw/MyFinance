import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-danger shadow-sm px-4">
      <Link className="navbar-brand me-4" to="/dashboard">
        <strong>MyFinance</strong>
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/receitas">
              Receitas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/despesas">
              Despesas
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/perfil">
              Perfil
            </Link>
          </li>
        </ul>

        <button onClick={handleLogout} className="btn btn-outline-light">
          Sair
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
