<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\CategoryRequest;
use App\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Session\Flash\FlashBag;

class CategoriesController extends Controller
{

    public function index()
    {
        Gate::authorize('view categories');
        $request = request();
        $filters = $request->query();
        $categories = Category::filter($filters)
            ->with('parent')->get();

        return
            [
                'categories' => $categories,
                'can' => Auth::user()->can('view categories')
            ];
    }


    public function create()
    {
        Gate::authorize('create categories');

        $category = new Category();
        $parents = Category::all();
        return
            [
                'category' => $category,
                'parents' => $parents
            ]
        ;
    }


    public function store(CategoryRequest $request)
    {
        Gate::authorize('create categories');
        $data = $request->except('image');

        $data['image'] = $this->storeImage($request);

        $category = Category::create($data);

        return $category;
    }


    public function show(string $id)
    {
        //
    }


    public function edit(Category $category)
    {
        Gate::authorize('update categories');

        $parents = Category::
            where('id', '<>', $category->id)
            ->where(function (Builder $builder) use ($category) {
                $builder->whereNull('parent_id')
                    ->orWhere('parent_id', '<>', $category->id);
            })
            ->get();


        return
            [
                'parents' => $parents,
                'category' => $category,
            ];

    }


    public function update(CategoryRequest $request, Category $category)
    {
        Gate::authorize('update categories');

        $data = $request->except('image');

        $data['image'] = $this->storeImage($request, $category);

        $category->update($data);

        return $category->load('parent');
    }


    public function destroy(Category $category)
    {
        Gate::authorize('delete categories');

        $this->deleteOldImage($category);
        $category->delete();
    }


    public function storeImage(CategoryRequest $request, Category $category = null)
    {
        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            if ($category) {
                $this->deleteOldImage($category);
            }
            return $request->file('image')->store('uploads/categories', 'public');

        } else if ($category && $category->image && filter_var($request->post('removeImage'), FILTER_VALIDATE_BOOLEAN)) {
            $this->deleteOldImage($category);
            return null;
        } else {
            return $category->image ?? null;
        }

    }


    public function deleteOldImage(Category $category)
    {
        if ($category->image && Storage::disk('public')->exists($category->image)) {
            Storage::disk('public')->delete($category->image);
        }
    }
}
