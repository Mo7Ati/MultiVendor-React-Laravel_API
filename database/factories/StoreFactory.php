<?php

namespace Database\Factories;

use Bezhanov\Faker\ProviderCollectionHelper;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create();
        ProviderCollectionHelper::addAllProvidersTo($faker);

        return [
            'name' => $faker->unique()->department,
            'description' => $faker->sentences(1, true),
            'logo_image' => "https://dummyimage.com/600x400/000/fff.png&text=" . $faker->numberBetween(0, 30),
            'status' => 'active',
        ];
    }
}
