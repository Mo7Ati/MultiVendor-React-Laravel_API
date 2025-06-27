<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\TemporaryFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    public function store(Request $request , $model)
    {
        if ($request->hasFile('upload')) {
            $collection = $request->post('collection');

            $file = $request->file('upload');
            $folder_name = uniqid() . '-' . now()->timestamp;
            $file_name = $file->getClientOriginalName();
            $file->storeAs("$model/$collection/tmp/" . $folder_name, $file_name);
            TemporaryFiles::create([
                'file_name' => $file_name,
                'folder_name' => $folder_name,
            ]);
            return $folder_name;
        }
        return '';
    }

    public function revert(Request $request, $model)
    {
        $folder_name = $request->input('folder_name');
        $collection = $request->input('collection');
        if ($folder_name && $collection) {
            if (Storage::exists("$model/$collection/tmp/" . $folder_name)) {
                Storage::deleteDirectory("$model/$collection/tmp/" . $folder_name);
                return response($folder_name, 200);
            }
        }
        return response('Failed', 400);
    }
}
