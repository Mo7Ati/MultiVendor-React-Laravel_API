<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;
use Illuminate\Database\Eloquent\Attributes\Scope;

class Store extends Model implements HasMedia
{
    use HasFactory, HasTranslations, InteractsWithMedia, Searchable;

    protected $fillable = [
        'name',
        'address',
        'description',
        'keywords',
        'social_media',
        'email',
        'delivery_time',
        'phone',
        'password',
        'is_active',
        'rate',
    ];

    protected $casts = [
        'name' => 'array',
        'address' => 'array',
        'description' => 'array',
        'keywords' => 'array',
        'social_media' => 'array',
    ];


    public array $translatable = ['name', 'description', 'address', 'keywords'];

    public function products()
    {
        return $this->hasMany(Product::class, 'store_id', 'id');
    }

    public function toSearchableArray()
    {
        return [
            'name' => $this->name,
            'email' => $this->email,
            'address' => $this->address,
        ];
    }
}
