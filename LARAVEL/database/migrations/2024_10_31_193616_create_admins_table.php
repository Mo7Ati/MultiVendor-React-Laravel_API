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
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('avatar')->nullable();
            $table->string('email')->unique();
            $table->string('password');
            // $table->string('phone_number')->unique();
            // $table->boolean('super_admin')->default(false);
            // $table->enum('status', ['active', 'inactive'])->default('active');

            $table->text('two_factor_secret')
                ->nullable();
            $table->text('two_factor_recovery_codes')
                ->nullable();
            $table->timestamp('two_factor_confirmed_at')
                ->nullable();
            $table->rememberToken();

            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
