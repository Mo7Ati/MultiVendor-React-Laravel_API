<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TemporaryFiles extends Model
{
    protected $fillable = [
        'file_name',
        'folder_name'
    ];
}
