<?php

namespace Routes;

use App\Http\Controllers\Front\CartController;
use App\Http\Controllers\Front\CheckoutController;
use App\Http\Controllers\front\paymentsController;
use App\Http\Controllers\Front\ProductController;
use Illuminate\Support\Facades\Route;



// Route::get('', function () {
//     return view('front.index');
// })->name('home');

Route::get('product/{product:slug}', [ProductController::class, 'show'])
    ->name('product.show');


Route::get("orders/{total}/pay", [paymentsController::class, 'create'])
    ->name('payments.create');


Route::post("stripe/checkout", [paymentsController::class, 'store'])
    ->name('payments.store');



Route::resources([
    'cart' => CartController::class,
    'checkout' => CheckoutController::class,
    // 'payments' => paymentsController::class ,
]);
