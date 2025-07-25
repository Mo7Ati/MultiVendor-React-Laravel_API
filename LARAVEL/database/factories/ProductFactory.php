<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Store;
use Bezhanov\Faker\ProviderCollectionHelper;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
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
            'name' => [
                'en' => $this->faker->name(),
                'ar' => $this->faker->name() . ' العربية',
            ],
            'description' => [
                'en' => $this->faker->paragraph,
                'ar' => $this->faker->paragraph . ' بالعربية',
            ],
            'keywords' => [
                'en' => implode(', ', $this->faker->words(5)),
                'ar' => implode(', ', $this->faker->words(5)) . ' عربية',
            ],
            'quantity' => $faker->numberBetween(50, 100),
            'price' => $faker->numberBetween(100, 200),
            'compare_price' => $faker->numberBetween(201, 500),
            'category_id' => 1,
            'store_id' => Store::inRandomOrder()->first('id'),
        ];
    }
}
