<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FileHandlerController extends Controller
{
    public function store(Request $request)
    {
        $file = $request->file('file');
        return $file;

        $path = $file->store("uploads/categories");
    }
}
