<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\CategoryRequest;
use App\Http\Resources\stores\CategoryResource;
use App\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class CategoriesController extends Controller
{
    public function index()
    {
        return CategoryResource::collection(Category::paginate());
    }
    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        return $category;
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->update($request->all());
        return $category->load('parent');
    }

    public function destroy(Category $category)
    {
        $category->delete();
    }


    // public function storeImage(CategoryRequest $request, Category $category = null)
    // {
    //     if ($request->hasFile('image') && $request->file('image')->isValid()) {
    //         if ($category) {
    //             $this->deleteOldImage($category);
    //         }
    //         return $request->file('image')->store('uploads/categories', 'public');

    //     } else if ($category && $category->image && filter_var($request->post('removeImage'), FILTER_VALIDATE_BOOLEAN)) {
    //         $this->deleteOldImage($category);
    //         return null;
    //     } else {
    //         return $category->image ?? null;
    //     }

    // }


    // public function deleteOldImage(Category $category)
    // {
    //     if ($category->image && Storage::disk('public')->exists($category->image)) {
    //         Storage::disk('public')->delete($category->image);
    //     }
    // }
}
