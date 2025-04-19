<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $categorias = ['Salário', 'Freelance', 'Alimentação', 'Transporte', 'Lazer', 'Saúde', 'Educação', 'Moradia'];

        foreach ($categorias as $nome) {
            Categoria::firstOrCreate(['nome' => $nome]);
        }
    }
}
