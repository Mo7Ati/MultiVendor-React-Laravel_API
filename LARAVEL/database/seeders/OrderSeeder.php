<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\Customer;
use App\Models\Store;
use Illuminate\Support\Arr;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = ['pending', 'preparing', 'on_the_way', 'completed', 'cancelled', 'rejected'];
        $paymentStatuses = ['unpaid', 'paid', 'failed', 'refunded'];

        $customers = Customer::pluck('id')->toArray();
        $stores = Store::pluck('id')->toArray();

        if (empty($customers) || empty($stores)) {
            $this->command->warn('No customers or stores found. Please seed them first.');
            return;
        }

        for ($i = 0; $i < 20; $i++) {
            $customerId = Arr::random($customers);
            $storeId = Arr::random($stores);

            $totalItemsAmount = fake()->randomFloat(2, 50, 500);
            $deliveryAmount = fake()->randomFloat(2, 0, 50);
            $totalAmount = $totalItemsAmount + $deliveryAmount;

            Order::create([
                'status' => Arr::random($statuses),
                'payment_status' => Arr::random($paymentStatuses),
                'cancelled_reason' => fake()->boolean(10) ? fake()->sentence() : null,

                'customer_id' => $customerId,
                'customer_data' => json_encode([
                    'name' => fake()->name(),
                    'email' => fake()->safeEmail(),
                    'phone' => fake()->phoneNumber(),
                ]),

                'store_id' => $storeId,

                'total' => $totalAmount,
                'total_items_amount' => $totalItemsAmount,
                'total_amount' => $totalAmount,
                'delivery_amount' => $deliveryAmount,

                'notes' => fake()->boolean(30) ? fake()->sentence() : null,
                'created_at' => now()->subDays(rand(0, 60)),
                'updated_at' => now(),
            ]);
        }
    }
}
