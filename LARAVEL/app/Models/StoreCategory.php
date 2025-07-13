<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Translatable\HasTranslations;
use Symfony\Contracts\Translation\TranslatableInterface;

class StoreCategory extends Model
{
    use HasTranslations;
    protected $fillable = [
        'name',
        'description',
    ];

    public array $translatable = ['name', 'description'];
}
