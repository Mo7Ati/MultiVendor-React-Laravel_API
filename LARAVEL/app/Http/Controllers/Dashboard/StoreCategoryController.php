<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\StoreCategory;
use Illuminate\Http\Request;

class StoreCategoryController extends Controller
{
    public function index()
    {
        return response()->json(StoreCategory::all());
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
        return response()->json($category);
    }

    public function update(Request $request, StoreCategory $category)
    {
        $data = $request->validate([
            'name' => 'required|array',
            'description' => 'nullable|array',
        ]);

        $category->update($data);
        return response()->json($category);
    }

    public function destroy(StoreCategory $category)
    {
        $category->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
