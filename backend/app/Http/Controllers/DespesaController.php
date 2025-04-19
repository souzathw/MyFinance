<?php

namespace App\Http\Controllers;

use App\Models\Despesa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DespesaController extends Controller
{
    public function index(Request $request)
    {
        $query = Despesa::with('categoria')
            ->where('user_id', Auth::id());

        if ($request->filled('categoria_id')) {
            $query->where('categoria_id', $request->categoria_id);
        }

        if ($request->filled('data_inicio')) {
            $query->whereDate('data', '>=', $request->data_inicio);
        }

        if ($request->filled('data_fim')) {
            $query->whereDate('data', '<=', $request->data_fim);
        }

        if ($request->filled('min_valor')) {
            $query->where('valor', '>=', $request->min_valor);
        }

        if ($request->filled('max_valor')) {
            $query->where('valor', '<=', $request->max_valor);
        }

        return response()->json($query->orderBy('data', 'desc')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'descricao' => 'required|string|max:255',
            'valor' => 'required|numeric|min:0.01',
            'data' => 'required|date',
            'categoria_id' => 'required|exists:categorias,id',
        ]);

        $data['user_id'] = Auth::id();

        $despesa = Despesa::create($data);

        return response()->json($despesa, 201);
    }

    public function update(Request $request, Despesa $despesa)
    {
        if ($despesa->user_id !== Auth::id()) {
            return response()->json(['error' => 'Acesso negado'], 403);
        }

        $data = $request->validate([
            'descricao' => 'sometimes|required|string|max:255',
            'valor' => 'sometimes|required|numeric|min:0.01',
            'data' => 'sometimes|required|date',
            'categoria_id' => 'sometimes|required|exists:categorias,id',
        ]);

        $despesa->update($data);

        return response()->json($despesa);
    }

    public function destroy(Despesa $despesa)
    {
        if ($despesa->user_id !== Auth::id()) {
            return response()->json(['error' => 'Acesso negado'], 403);
        }

        $despesa->delete();

        return response()->json(['message' => 'Despesa removida com sucesso']);
    }
}
