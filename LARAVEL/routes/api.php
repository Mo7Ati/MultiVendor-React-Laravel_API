<?php

use App\Http\Controllers\Dashboard\PermissionsController;
use App\Http\Controllers\Dashboard\StoreCategoryController;
use App\Http\Controllers\Dashboard\UploadController;
use App\Http\Resources\stores\StoreResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\AdminController;
use App\Http\Controllers\Dashboard\CategoriesController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\RoleController;
use App\Http\Controllers\Dashboard\StoreController;
use App\Http\Controllers\Dashboard\UserController;


Route::get('/admin', function () {
    $admin = Auth::guard('admin')->user();
    return response()->json(['admin' => $admin]);
});


Route::get('/store', function () {
    $store = Auth::guard('store')->user();
    return response()->json(['store' => StoreResource::make($store)]);
});



Route::group([
    'middleware' => 'auth:admin',
    'prefix' => 'admin/dashboard',
    // 'as' => 'dashboard.'
], function () {
    Route::resources([
        'stores' => StoreController::class,
        'store-categories' => StoreCategoryController::class,
        'admins' => AdminController::class,
        'users' => UserController::class,
        'roles' => RoleController::class,
    ]);

    Route::get('permissions', [PermissionsController::class, 'index'])->name('permissions.index');
    Route::get('products', [ProductController::class, 'index'])->name('products.index');
    Route::get('categories', [CategoriesController::class, 'index'])->name('categories.index');

    Route::post('upload', [UploadController::class, 'store']);
    Route::delete('revert', [UploadController::class, 'revert']);
    Route::post('load', [UploadController::class, 'load']);
    Route::delete('remove', [UploadController::class, 'remove']);
});

// Store Dashboard Routes
Route::group([
    'middleware' => 'auth:store',
    'prefix' => 'store/dashboard',
    // 'as' => 'store.dashboard.'
], function () {
    Route::resources([
        'categories' => CategoriesController::class,
        'products' => ProductController::class,
    ]);
});
