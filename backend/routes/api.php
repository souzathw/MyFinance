<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ReceitaController;
use App\Http\Controllers\DespesaController;
use App\Http\Controllers\DashboardController;

    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:api')->group(function () {
        Route::get('/me', [AuthController::class, 'me']);
        Route::post('/logout', [AuthController::class, 'logout']);

    Route::middleware('auth:api')->group(function () {
        Route::get('/categorias', [CategoriaController::class, 'index']);
        Route::post('/categorias', [CategoriaController::class, 'store']);
        Route::put('/categorias/{categoria}', [CategoriaController::class, 'update']);
        Route::delete('/categorias/{categoria}', [CategoriaController::class, 'destroy']);
    });

    Route::middleware('auth:api')->group(function () {
        Route::get('/receitas', [ReceitaController::class, 'index']);
        Route::post('/receitas', [ReceitaController::class, 'store']);
        Route::put('/receitas/{receita}', [ReceitaController::class, 'update']);
        Route::delete('/receitas/{receita}', [ReceitaController::class, 'destroy']);

    });

    Route::middleware('auth:api')->group(function () {
        Route::get('/despesas', [DespesaController::class, 'index']);
        Route::post('/despesas', [DespesaController::class, 'store']);
        Route::put('/despesas/{despesa}', [DespesaController::class, 'update']);
        Route::delete('/despesas/{despesa}', [DespesaController::class, 'destroy']);
    });

    Route::middleware('auth:api')->group(function () {
        Route::get('/dashboard/resumo', [DashboardController::class, 'resumoGeral']);
        Route::get('/dashboard/mensal', [DashboardController::class, 'graficoMensal']);
        Route::get('/dashboard/categorias', [DashboardController::class, 'graficoPorCategoria']);
    });


});
