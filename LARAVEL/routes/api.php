<?php

use App\Http\Controllers\Dashboard\FileHandlerController;
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
use Spatie\MediaLibrary\MediaCollections\Models\Media;





Route::get('/admin', function (Request $request) {
    $admin = Auth::guard('admin')->user();
    return ['user' => $admin,];//'permissions' => $admin->permissions()
})->middleware('auth:admin');



Route::group([
    'middleware' => 'auth:admin',
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
    ]);

    Route::post('upload', [UploadController::class, 'store']);
    Route::delete('upload', [UploadController::class, 'revert']);

    Route::post('load', function (Request $request) {
        $file = Media::findByUuid($request->getContent());
        return $file;
    });

    Route::post('remove', function (Request $request) {
        $file = Media::findByUuid($request->getContent());
        return $file->delete();

    });

});
