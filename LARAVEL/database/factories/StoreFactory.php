<?php

namespace Database\Factories;

use Bezhanov\Faker\ProviderCollectionHelper;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

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
            'name' => [
                'en' => $this->faker->name(),
                'ar' => $this->faker->name() . ' العربية',
            ],
            'description' => [
                'en' => $this->faker->paragraph,
                'ar' => $this->faker->paragraph . ' بالعربية',
            ],
            'address' => [
                'en' => $this->faker->address,
                'ar' => $this->faker->address . ' العربية',
            ],
            'keywords' => [
                'en' => implode(', ', $this->faker->words(5)),
                'ar' => implode(', ', $this->faker->words(5)) . ' عربية',
            ],
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->unique()->phoneNumber,
            'password' => Hash::make('password'),
            'delivery_time' => $this->faker->numberBetween(10, 20),
            'social_media' => [
                [
                    'platform' => 'Facebook',
                    'url' => 'https://facebook.com/' . $this->faker->userName,
                ],
                [
                    'platform' => 'Instagram',
                    'url' => 'https://instagram.com/' . $this->faker->userName,
                ],
            ],
            'rate' => $this->faker->randomFloat(1, 0, 5),
            'is_active' => $this->faker->boolean,
            'category_id' => 1,
        ];
    }
}

