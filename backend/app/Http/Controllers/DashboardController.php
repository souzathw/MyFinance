<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Receita;
use App\Models\Despesa;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function resumoGeral()
    {
        $userId = Auth::id();

        $totalReceitas = Receita::where('user_id', $userId)->sum('valor');
        $totalDespesas = Despesa::where('user_id', $userId)->sum('valor');
        $saldo = $totalReceitas - $totalDespesas;

        return response()->json([
            'total_receitas' => $totalReceitas,
            'total_despesas' => $totalDespesas,
            'saldo' => $saldo,
        ]);
    }

    public function graficoMensal()
    {
        $userId = Auth::id();

        $receitas = Receita::selectRaw('MONTH(data) as mes, SUM(valor) as total')
            ->where('user_id', $userId)
            ->groupBy('mes')
            ->orderBy('mes')
            ->get();

        $despesas = Despesa::selectRaw('MONTH(data) as mes, SUM(valor) as total')
            ->where('user_id', $userId)
            ->groupBy('mes')
            ->orderBy('mes')
            ->get();

        return response()->json([
            'receitas' => $receitas,
            'despesas' => $despesas,
        ]);
    }

    public function graficoPorCategoria()
    {
        $userId = Auth::id();

        $receitas = Receita::selectRaw('categorias.nome as categoria, SUM(receitas.valor) as total')
            ->join('categorias', 'receitas.categoria_id', '=', 'categorias.id')
            ->where('receitas.user_id', $userId)
            ->groupBy('categorias.nome')
            ->get();

        $despesas = Despesa::selectRaw('categorias.nome as categoria, SUM(despesas.valor) as total')
            ->join('categorias', 'despesas.categoria_id', '=', 'categorias.id')
            ->where('despesas.user_id', $userId)
            ->groupBy('categorias.nome')
            ->get();

        return response()->json([
            'receitas' => $receitas,
            'despesas' => $despesas,
        ]);
    }
}
