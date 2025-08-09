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
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('mobile');
            $table->boolean('is_active')->default(true);
            $table->boolean('mobile_verified')->default(false);

            $table->json('about_mobile')->nullable();
            $table->enum('mobile_type', ['ios', 'android'])->nullable();
            $table->json('location')->nullable();
            $table->string('fcm_token')->nullable();

            $table->string('timezone')->nullable();
            $table->timestamp('last_seen_at')->nullable();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
