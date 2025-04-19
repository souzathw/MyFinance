import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import DashboardLayout from '../components/DashboardLayout';

Chart.register(BarElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [resumo, setResumo] = useState({ saldo: 0, total_receitas: 0, total_despesas: 0 });
  const [mensal, setMensal] = useState({ receitas: [], despesas: [] });
  const [categorias, setCategorias] = useState({ receitas: [], despesas: [] });
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const resResumo = await api.get('/dashboard/resumo');
        const resMensal = await api.get('/dashboard/mensal');
        const resCategorias = await api.get('/dashboard/categorias');

        setResumo(resResumo.data);
        setMensal(resMensal.data);
        setCategorias(resCategorias.data);
      } catch (err) {
        console.error(err);
        setErro('Erro ao carregar dados do dashboard');
      }
    }

    fetchData();
  }, []);

  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const receitaMensal = Array(12).fill(0);
  const despesaMensal = Array(12).fill(0);

  mensal.receitas?.forEach((item) => {
    if (item.mes && item.total) receitaMensal[item.mes - 1] = Number(item.total);
  });

  mensal.despesas?.forEach((item) => {
    if (item.mes && item.total) despesaMensal[item.mes - 1] = Number(item.total);
  });

  return (
    <DashboardLayout>
      <h2 className="mb-4">Dashboard Financeiro</h2>

      {erro && <div className="alert alert-danger">{erro}</div>}

      {/* Resumo */}
      <div className="row gy-4 mb-5">
        <div className="col-lg-4 col-md-6">
          <div className="card border-success shadow-sm h-100">
            <div className="card-header bg-success text-white fw-bold">Saldo Total</div>
            <div className="card-body d-flex align-items-center justify-content-center">
              <h4 className="fw-bold">R$ {(Number(resumo.saldo) || 0).toFixed(2)}</h4>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-header bg-primary text-white fw-bold">Total de Receitas</div>
            <div className="card-body d-flex align-items-center justify-content-center">
              <h4 className="fw-bold">R$ {(Number(resumo.total_receitas) || 0).toFixed(2)}</h4>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="card border-danger shadow-sm h-100">
            <div className="card-header bg-danger text-white fw-bold">Total de Despesas</div>
            <div className="card-body d-flex align-items-center justify-content-center">
              <h4 className="fw-bold">R$ {(Number(resumo.total_despesas) || 0).toFixed(2)}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="row gy-4">
        <div className="col-xl-8 col-lg-7">
          <div className="card shadow-sm h-100">
            <div className="card-header fw-bold">Fluxo Mensal</div>
            <div className="card-body">
              <Bar
                data={{
                  labels: meses,
                  datasets: [
                    {
                      label: 'Receitas',
                      data: receitaMensal,
                      backgroundColor: 'rgba(40, 167, 69, 0.6)',
                    },
                    {
                      label: 'Despesas',
                      data: despesaMensal,
                      backgroundColor: 'rgba(220, 53, 69, 0.6)',
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  plugins: {
                    legend: { position: 'top' },
                  },
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-xl-4 col-lg-5 d-flex flex-column gap-4">
          <div className="card shadow-sm">
            <div className="card-header fw-bold text-center">Receitas por Categoria</div>
            <div className="card-body">
              <Pie
                data={{
                  labels: categorias.receitas?.map((c) => c.categoria),
                  datasets: [
                    {
                      data: categorias.receitas?.map((c) => Number(c.total)),
                      backgroundColor: ['#28a745', '#6f42c1', '#ffc107', '#17a2b8', '#fd7e14'],
                    },
                  ],
                }}
              />
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-header fw-bold text-center">Despesas por Categoria</div>
            <div className="card-body">
              <Pie
                data={{
                  labels: categorias.despesas?.map((c) => c.categoria),
                  datasets: [
                    {
                      data: categorias.despesas?.map((c) => Number(c.total)),
                      backgroundColor: ['#dc3545', '#20c997', '#6610f2', '#e83e8c', '#fd7e14'],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
