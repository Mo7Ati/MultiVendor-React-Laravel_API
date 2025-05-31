<?php

use App\Http\Controllers\Auth\SocialLoginController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;



Route::get('auth/{provider}/redirect', [SocialLoginController::class, 'redirect'])
    ->name('auth.socialite.redirect');


Route::get('auth/{provider}/callback', [SocialLoginController::class, 'callback'])
    ->name('auth.socialite.callback');

require __DIR__ . '/dashboard.php';
require __DIR__ . '/front.php';
