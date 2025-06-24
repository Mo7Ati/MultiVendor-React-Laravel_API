<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreRequest;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index()
    {
        $stores = Store::all();
        return ['stores' => $stores];
    }

    public function store(StoreRequest $request)
    {
        $store = Store::create($request->all());

        if ($request->hasFile('image')) {
            $store->addMediaFromRequest('image')->toMediaCollection('stores');
        }

        return $store;
    }
    public function update(StoreRequest $request, Store $store)
    {
        $store->update($request->all());

        return $store;
    }

    public function destroy(Store $store)
    {
        $store->delete();
    }

    // public function storeImage(Request $request, Store $store = null)
    // {
    //     if ($request->hasFile('logo_image') && $request->file('logo_image')->isValid()) {
    //         if ($store) {
    //             $this->deleteOldImage($store);
    //         }
    //         return $request->file('logo_image')->store('uploads/stores', 'public');
    //     } else if ($store && $store->logo_image && filter_var($request->post('removeImage'), FILTER_VALIDATE_BOOLEAN)) {
    //         $this->deleteOldImage($store);
    //         return null;
    //     } else {
    //         return $store->logo_image ?? null;
    //     }

    // }

    // public function deleteOldImage(Store $store)
    // {
    //     if ($store->logo_image && Storage::disk('public')->exists($store->logo_image)) {
    //         Storage::disk('public')->delete($store->logo_image);
    //     }
    // }
}
