import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setErro('');

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      const response = await api.post('/register', {
        name: nome,
        email,
        password: senha,
        password_confirmation: confirmarSenha,
      });
      console.log('Resposta do registro:', response.data);


      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
        if (err.response && err.response.data) {
          const errorData = err.response.data;
      
          if (errorData.message) {
            setErro(errorData.message); // mensagem direta do backend
          } else if (errorData.errors) {
            const mensagens = Object.values(errorData.errors).flat().join(' | ');
            setErro(mensagens); // mensagens de validação
          } else {
            setErro('Erro inesperado. Tente novamente.');
          }
        } else {
          setErro('Erro ao conectar com o servidor.');
        }
      }
      
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Criar Conta</h2>
      <form onSubmit={handleRegister}>
        {erro && <div className="alert alert-danger">{erro}</div>}

        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">E-mail</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Senha</label>
          <input
            type="password"
            className="form-control"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar Senha</label>
          <input
            type="password"
            className="form-control"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-danger">
          Registrar
        </button>
      </form>
        <p className="mt-3">
    Já tem conta? <a href="/">Entrar</a>
    </p>

    </div>
  );
};

export default Register;
