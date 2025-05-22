<?php

namespace Database\Factories;

use App\Models\Category;
use Bezhanov\Faker\ProviderCollectionHelper;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     *
     */
    public function definition(): array
    {
        $faker = \Faker\Factory::create();
        ProviderCollectionHelper::addAllProvidersTo($faker);

        return [
            'name' => $faker->category,
            'description' => $faker->sentences(1, true),
            'parent_id' => Category::inRandomOrder()->first() ?? null,
            'image' => 'https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/primary/ProductShowcasesampleimages/JPEG/Product+Showcase-1.jpg',
            'status' => 'active' ,
        ];
    }
}
