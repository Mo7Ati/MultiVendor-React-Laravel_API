<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('promo_codes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();

            $table->json('name');
            $table->json('description')->nullable();

            $table->enum('discount_type',['percentage', 'fixed_amount']);

            $table->double('discount_value');

            $table->integer('usage_limit');
            $table->integer('used_count')->default(0);

            $table->date('valid_from');
            $table->date('valid_until');

            $table->boolean('is_active')->default(true);

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('promo_codes');
    }
};
