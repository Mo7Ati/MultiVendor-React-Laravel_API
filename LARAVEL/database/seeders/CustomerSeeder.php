<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Customer;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 20; $i++) {
            Customer::create([
                'name' => fake()->name(),
                'mobile' => fake()->unique()->numerify('01#########'),
                'is_active' => fake()->boolean(90),
                'mobile_verified' => fake()->boolean(70),

                'about_mobile' => fake()->boolean(50) ? json_encode([
                    'os_version' => fake()->randomElement(['14.0', '15.2', '16.1', '12.5']),
                    'model' => fake()->word(),
                ]) : null,

                'mobile_type' => fake()->optional()->randomElement(['ios', 'android']),

                'location' => fake()->boolean(50) ? json_encode([
                    'lat' => fake()->latitude(),
                    'lng' => fake()->longitude(),
                ]) : null,

                'fcm_token' => fake()->optional()->sha1(),

                'timezone' => fake()->optional()->timezone(),
                'last_seen_at' => fake()->optional()->dateTimeBetween('-30 days', 'now'),
            ]);
        }
    }
}
