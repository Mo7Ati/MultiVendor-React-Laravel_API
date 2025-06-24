<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Category;
use App\Models\Product;
use App\Models\Store;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\CategoryFactory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        // Category::factory(5)->create();
        // Store::factory(10)->create();
        // Product::factory(20)->create();


        // User::factory()->create([
        //     'name' => 'Dawly',
        //     'email' => 'dawly@ps.com',
        //     'password' => Hash::make('password'),
        // ]);

        Admin::factory()->create([
            'name' => 'Admin',
            'email' => 'admin@ps.com',
            'password' => Hash::make('password'),
        ]);
    }
}
