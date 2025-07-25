<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\stores\StoreCategoryResource;
use App\Models\StoreCategory;
use Illuminate\Http\Request;

class StoreCategoryController extends Controller
{
    public function index(Request $request)
    {
        $data = $request->validate([
            'search' => 'nullable|string',
        ]);
        $query = isset($data['search'])
            ? StoreCategory::search($data['search'])
            : StoreCategory::query();

        return StoreCategoryResource::collection($query->paginate($data['per_page'] ?? 15));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'array'],
            'description' => 'nullable|array',
        ]);
        $category = StoreCategory::create($data);
        return response()->json($category, 201);
    }

    public function show($id)
    {
        $category = StoreCategory::findOrFail($id);
        return response()->json(StoreCategoryResource::make($category)->serializeForEdit());
    }

    public function update(Request $request, $id)
    {
        $category = StoreCategory::findOrFail($id);
        $data = $request->validate([
            'name' => ['required', 'array'],
            'name.en' => ['required', 'string', 'max:255'],
            'name.ar' => ['required', 'string', 'max:255'],

            'description' => ['nullable', 'array'],
            'description.en' => ['nullable', 'string'],
            'description.ar' => ['nullable', 'string'],
        ]);
        $category->update($data);
        return $category;
    }

    public function destroy(StoreCategory $category)
    {
        $category->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
