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
        Schema::create('product_additions', function (Blueprint $table) {
            $table->foreignId('product_id')->constrained();
            $table->foreignId('addition_id')->constrained();
            $table->decimal('price', 10, 2);
            $table->primary(['product_id', 'addition_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_additions');
    }
};
