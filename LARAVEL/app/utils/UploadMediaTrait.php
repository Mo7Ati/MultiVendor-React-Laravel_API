<?php

namespace App\Utils;

use App\Models\TemporaryFiles;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

trait UploadMediaTrait
{
    public function storeFiles(Request $request, $model)
    {
        $media = $request->post('media');
        foreach ($media as $key => $value) {
            if (isset($value)) {
                $collection = $model->getTable() . "-" . $key;
                if (is_array($value)) {
                    $temporary_files = TemporaryFiles::whereIn('folder_name', $value)->get();
                    foreach ($temporary_files as $file) {
                        $model->addMediaFromDisk("tmp/$file->folder_name/$file->file_name")
                            ->toMediaCollection($collection);

                        Storage::deleteDirectory("tmp/$file->folder_name");

                        $file->delete();
                    }
                } else {
                    $temporary_file = TemporaryFiles::where('folder_name', $value)->first();
                    $model->addMediaFromDisk("tmp/$value/$temporary_file->file_name")
                        ->toMediaCollection($collection);
                    Storage::deleteDirectory("tmp/$value");
                    $temporary_file->delete();
                }
            }
        }
    }

}

