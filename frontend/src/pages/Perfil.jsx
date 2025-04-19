import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const Perfil = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get('/me');
        setNome(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        setErro('Erro ao carregar dados do usuário');
      }
    }

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setMensagem('');

    if (senha && senha !== confirmarSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    try {
      await api.put('/perfil', {
        name: nome,
        password: senha,
        password_confirmation: confirmarSenha,
      });

      setSenha('');
      setConfirmarSenha('');
      setMensagem('Perfil atualizado com sucesso!');
    } catch (err) {
      setErro('Erro ao atualizar perfil');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Meu Perfil</h2>

        <form onSubmit={handleSubmit} className="mt-4">
          {mensagem && <div className="alert alert-success">{mensagem}</div>}
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
            <label className="form-label">Email (não editável)</label>
            <input type="email" className="form-control" value={email} disabled />
          </div>

          <div className="mb-3">
            <label className="form-label">Nova Senha</label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Deixe em branco para não alterar"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirmar Nova Senha</label>
            <input
              type="password"
              className="form-control"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              placeholder="Repita a nova senha"
            />
          </div>

          <button className="btn btn-primary">Salvar</button>
        </form>
      </div>
    </>
  );
};

export default Perfil;
