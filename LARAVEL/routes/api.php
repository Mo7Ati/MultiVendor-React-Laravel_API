<?php

use App\Http\Controllers\Dashboard\FileHandlerController;
use App\Http\Controllers\Dashboard\StoreCategoryController;
use App\Http\Controllers\Dashboard\UploadController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Dashboard\AdminController;
use App\Http\Controllers\Dashboard\CategoriesController;
use App\Http\Controllers\Dashboard\ProductController;
use App\Http\Controllers\Dashboard\RoleController;
use App\Http\Controllers\Dashboard\StoreController;
use App\Http\Controllers\Dashboard\TagsController;
use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Support\Facades\Storage;






Route::get('/admin', function (Request $request) {
    $admin = Auth::guard('admin')->user();
    return response()->json(['user' => $admin]);
})->middleware('auth:sanctum');



Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'admin/dashboard',
    'as' => 'dashboard.'
], function () {
    Route::resources([
        'categories' => CategoriesController::class,
        'stores' => StoreController::class,
        'products' => ProductController::class,
        'admins' => AdminController::class,
        'users' => UserController::class,
        'roles' => RoleController::class,
        'tags' => TagsController::class,
        'store-categories' => StoreCategoryController::class,
    ]);

    Route::post('upload', [UploadController::class, 'store']);
    Route::delete('revert', [UploadController::class, 'revert']);
    Route::post('load', [UploadController::class, 'load']);
    Route::delete('remove', [UploadController::class, 'remove']);
});
