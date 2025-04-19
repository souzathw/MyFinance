<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;

class PerfilController extends Controller
{
    public function atualizar(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $data = $request->validate([
            'name' => 'required|string|max:100',
            'password' => 'nullable|string|min:6|confirmed',
        ]);

        $user->name = $data['name'];

        if (!empty($data['password'])) {
            $user->password = Hash::make($data['password']);
        }

        $user->save();

        return response()->json(['message' => 'Perfil atualizado com sucesso']);
    }
}
