<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\CreateStoreRequest;
use App\Http\Requests\Dashboard\UpdateStoreRequest;
use App\Models\Store;
use App\Utils\UploadMediaTrait;

class StoreController extends Controller
{
    use UploadMediaTrait;

    public function index()
    {
        $stores = Store::all();
        return ['stores' => $stores];
    }

    public function store(CreateStoreRequest $request)
    {
        $store = Store::create($request->validated());
        $this->storeFiles($request, $store);
        return $store;
    }
    public function edit(Store $store)
    {
        return $store;
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
