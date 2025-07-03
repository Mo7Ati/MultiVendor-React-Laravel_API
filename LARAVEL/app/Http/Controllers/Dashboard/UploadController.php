<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\TemporaryFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
class UploadController extends Controller
{
    public function store(Request $request)
    {
        if ($request->hasFile('upload')) {
            $file = $request->file('upload');
            $folder_name = uniqid() . '-' . now()->timestamp;
            $file_name = $file->getClientOriginalName();
            $file->storeAs("tmp/" . $folder_name, $file_name);
            TemporaryFiles::create([
                'file_name' => $file_name,
                'folder_name' => $folder_name,
            ]);
            return $folder_name;
        }
        return '';
    }

    public function revert(Request $request)
    {
        $folder_name = $request->input('folder_name');
        if ($folder_name) {
            if (Storage::exists("tmp/" . $folder_name)) {
                Storage::deleteDirectory("tmp/" . $folder_name);
                return response($folder_name, 200);
            }
        }
        return response('Failed', 400);
    }
    public function load(Request $request)
    {
        $file = Media::findByUuid($request->getContent());
        return $file;
    }
    public function remove(Request $request)
    {
        $file = Media::findByUuid($request->getContent());
        return $file->delete();
    }
}
