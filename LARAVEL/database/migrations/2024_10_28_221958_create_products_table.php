<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('store_id')->constrained('stores')->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained('categories')->nullOnDelete();
            $table->string('slug');//->unique();
            $table->text('description')->nullable();
            $table->text('image')->nullable();
            $table->float('price');
            $table->float('compare_price')->nullable();
            $table->enum('status', ['active', 'archived'])->default('archived');
            $table->unsignedSmallInteger('quantity')->default(0);
            $table->json('options')->nullable();
            $table->float('rating')->default(0);
            $table->boolean('featured')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
