<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index()
    {
        Gate::authorize('view stores');

        $stores = Store::paginate();
        return Inertia::render(
            'dashboard/stores/stores.index',
            ['stores' => $stores],
        );
    }


    public function create()
    {
        Gate::authorize('create stores');

        $store = new Store();
        return Inertia::render(
            'dashboard/stores/stores.create',
            ['store' => $store],
        );
    }
    public function store(Request $request)
    {
        Gate::authorize('create stores');

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo_image' => 'nullable|image',
            'status' => 'required|in:active,inactive',
        ]);

        $data = $request->except('logo_image');


        $data['logo_image'] = $this->storeImage($request);

        Store::create($data);

        return redirect()->route('dashboard.stores.index')
            ->with('message', 'Store Added Successfully');


    }

    public function show(string $id)
    {
        //
    }

    public function edit(Store $store)
    {
        Gate::authorize('update stores');


        return Inertia::render(
            'dashboard/stores/stores.edit',
            [
                'store' => $store,
            ]
        );

    }

    public function update(Request $request, Store $store)
    {
        Gate::authorize('update stores');

        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'logo_image' => 'nullable|image',
            'status' => 'required|in:active,inactive',
        ]);

        $data = $request->except('logo_image');

        $data['logo_image'] = $this->storeImage($request, $store);

        $store->update($data);

        return redirect()->route('dashboard.stores.index')
            ->with('message', 'Store Updated Successfully');
    }

    public function destroy(Store $store)
    {
        Gate::authorize('delete stores');

        $this->deleteOldImage($store);
        $store->delete();

    }

    public function storeImage(Request $request, Store $store = null)
    {
        if ($request->hasFile('logo_image') && $request->file('logo_image')->isValid()) {
            if ($store) {
                $this->deleteOldImage($store);
            }
            return $request->file('logo_image')->store('uploads/stores', 'public');
        } else if ($store && $store->logo_image && filter_var($request->post('removeImage'), FILTER_VALIDATE_BOOLEAN)) {
            $this->deleteOldImage($store);
            return null;
        } else {
            return $store->logo_image ?? null;
        }

    }

    public function deleteOldImage(Store $store)
    {
        if ($store->logo_image && Storage::disk('public')->exists($store->logo_image)) {
            Storage::disk('public')->delete($store->logo_image);
        }
    }
}
