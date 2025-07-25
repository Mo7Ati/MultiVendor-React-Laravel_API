<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\CreateStoreRequest;
use App\Http\Requests\Dashboard\UpdateStoreRequest;
use App\Http\Resources\stores\StoreEditResource;
use App\Http\Resources\stores\StoreResource;
use App\Models\Store;
use App\Utils\UploadMediaTrait;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    use UploadMediaTrait;

    public function index(Request $request)
    {
        $data = $request->validate([
            'search' => 'nullable|string',
            'is_active' => 'nullable|in:true,false',
            'sortColumn' => 'nullable|string',
            'sortOrder' => 'nullable|in:asc,desc',
            'per_page' => 'nullable|integer'
        ]);
        $query = isset($data['search'])
            ? Store::search($data['search'])
            : Store::query();

        if (array_key_exists('is_active', $data)) {
            $query->where('is_active', filter_var($data['is_active'], FILTER_VALIDATE_BOOLEAN));
        }

        $query->orderBy($data['sortColumn'] ?? 'id', $data['sortOrder'] ?? 'asc');

        return StoreResource::collection($query->paginate($data['per_page'] ?? 15));
    }
    public function store(CreateStoreRequest $request)
    {
        $store = Store::create($request->validated());
        $this->storeFiles($request, $store);
        return $store;
    }
    public function show(Store $store)
    {
        return StoreResource::make($store)->serializeForEdit();
    }
    public function update(UpdateStoreRequest $request, Store $store)
    {
        $store->update($request->validated());
        $this->storeFiles($request, $store);
        return $store;
    }
    public function destroy(Store $store)
    {
        $store->delete();
    }
}
