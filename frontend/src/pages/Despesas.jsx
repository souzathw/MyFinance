import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from '../components/Navbar';

const Despesas = () => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [erro, setErro] = useState('');
  const [editando, setEditando] = useState(null);
  const [filtros, setFiltros] = useState({
    data_inicio: '',
    data_fim: '',
    categoria_id: '',
    min_valor: '',
    max_valor: '',
  });

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    const resCategorias = await api.get('/categorias');
    const query = new URLSearchParams(filtros).toString();
    const resDespesas = await api.get(`/despesas?${query}`);
    setCategorias(resCategorias.data);
    setDespesas(resDespesas.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      if (editando) {
        await api.put(`/despesas/${editando}`, {
          descricao,
          valor,
          data,
          categoria_id: categoriaId,
        });
        setEditando(null);
      } else {
        const response = await api.post('/despesas', {
          descricao,
          valor,
          data,
          categoria_id: categoriaId,
        });
        setDespesas([response.data, ...despesas]);
      }

      limparFormulario();
      carregarDados();
    } catch (err) {
      setErro('Erro ao salvar despesa. Verifique os campos.');
    }
  };

  const limparFormulario = () => {
    setDescricao('');
    setValor('');
    setData('');
    setCategoriaId('');
    setEditando(null);
  };

  const editarDespesa = (d) => {
    setDescricao(d.descricao);
    setValor(d.valor);
    setData(d.data);
    setCategoriaId(d.categoria_id);
    setEditando(d.id);
    window.scrollTo(0, 0);
  };

  const excluirDespesa = async (id) => {
    if (confirm('Deseja realmente excluir esta despesa?')) {
      await api.delete(`/despesas/${id}`);
      setDespesas(despesas.filter((d) => d.id !== id));
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="mb-4">{editando ? 'Editar Despesa' : 'Despesas'}</h2>

        <form onSubmit={handleSubmit}>
          {erro && <div className="alert alert-danger">{erro}</div>}

          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">Descrição</label>
              <input
                type="text"
                className="form-control"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                required
              />
            </div>
            <div className="col-md-2">
              <label className="form-label">Valor</label>
              <input
                type="number"
                className="form-control"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                required
                min="0.01"
                step="0.01"
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Data</label>
              <input
                type="date"
                className="form-control"
                value={data}
                onChange={(e) => setData(e.target.value)}
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Categoria</label>
              <select
                className="form-select"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
                required
              >
                <option value="">Selecione</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-danger me-2">
            {editando ? 'Atualizar' : 'Adicionar Despesa'}
          </button>

          {editando && (
            <button type="button" className="btn btn-secondary" onClick={limparFormulario}>
              Cancelar
            </button>
          )}
        </form>

        <h5 className="mt-5">Filtros</h5>
        <div className="row mb-4">
          <div className="col-md-2">
            <label className="form-label">Data Início</label>
            <input
              type="date"
              className="form-control"
              value={filtros.data_inicio}
              onChange={(e) => setFiltros({ ...filtros, data_inicio: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Data Fim</label>
            <input
              type="date"
              className="form-control"
              value={filtros.data_fim}
              onChange={(e) => setFiltros({ ...filtros, data_fim: e.target.value })}
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Valor Mínimo</label>
            <input
              type="number"
              className="form-control"
              value={filtros.min_valor}
              onChange={(e) => setFiltros({ ...filtros, min_valor: e.target.value })}
              step="0.01"
            />
          </div>
          <div className="col-md-2">
            <label className="form-label">Valor Máximo</label>
            <input
              type="number"
              className="form-control"
              value={filtros.max_valor}
              onChange={(e) => setFiltros({ ...filtros, max_valor: e.target.value })}
              step="0.01"
            />
          </div>
          <div className="col-md-3">
            <label className="form-label">Categoria</label>
            <select
              className="form-select"
              value={filtros.categoria_id}
              onChange={(e) => setFiltros({ ...filtros, categoria_id: e.target.value })}
            >
              <option value="">Todas</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-1 d-flex align-items-end">
            <button className="btn btn-secondary w-100" onClick={carregarDados}>
              Filtrar
            </button>
          </div>
        </div>

        <hr />
        <h4>Despesas Cadastradas</h4>
        {despesas.length === 0 ? (
          <p>Nenhuma despesa encontrada.</p>
        ) : (
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Data</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {despesas.map((d) => (
                <tr key={d.id}>
                  <td>{d.descricao}</td>
                  <td>R$ {parseFloat(d.valor).toFixed(2)}</td>
                  <td>{new Date(d.data).toLocaleDateString()}</td>
                  <td>{d.categoria?.nome}</td>
                  <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => editarDespesa(d)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => excluirDespesa(d.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Despesas;
