<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\StoreRequest;
use App\Models\Store;
use App\Models\TemporaryFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StoreController extends Controller
{
    public function index()
    {
        $stores = Store::with('media')->get();
        return ['stores' => $stores];
    }

    public function store(StoreRequest $request)
    {
        $store = Store::create($request->all());

        if ($request->has('gallery')) {
            $gallery = $request->post('gallery');

            $temporary_files = TemporaryFiles::whereIn('folder_name', $gallery)->get();
            foreach ($temporary_files as $file) {
                $store->addMediaFromDisk("stores/gallery/tmp/$file->folder_name/$file->file_name")
                    ->toMediaCollection('store_gallery');
                Storage::deleteDirectory("stores/gallery/tmp/$file->folder_name");
                $file->delete();
            }
        }

        $logo_folder_name = $request->post('logo');
        if ($logo_folder_name) {
            $temporary_file = TemporaryFiles::where('folder_name', $logo_folder_name)->first();
            $store->addMediaFromDisk("stores/logos/tmp/$logo_folder_name/$temporary_file->file_name")
                ->toMediaCollection('store_logo');
            Storage::deleteDirectory("stores/logos/tmp/$logo_folder_name");
            $temporary_file->delete();
        }

        return $store->load('media');
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
