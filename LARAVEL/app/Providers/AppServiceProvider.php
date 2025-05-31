<?php

namespace App\Providers;

use App\Repositries\Cart\CartModelRepository;
use App\Repositries\Cart\CartRepository;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        Paginator::useBootstrap();

        $this->app->bind(CartRepository::class, CartModelRepository::class);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

        Gate::before(function ($user) {
            if ($user->super_admin) {
                return true;
            }
        });

        foreach (config('abilities') as $ability) {
            Gate::define($ability, function ($user) use ($ability) {
                return $user->hasAbility($ability);
            });
        }
    }
}
