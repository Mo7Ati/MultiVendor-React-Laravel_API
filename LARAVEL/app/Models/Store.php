<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;

class Store extends Model implements HasMedia
{
    use HasFactory, HasTranslations, InteractsWithMedia;

    protected $fillable = [
        'name',
        'address',
        'description',
        'keywords',
        'social_media',
        'email',
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
    protected $appends = [
        'logo_url',
    ];

    public function products()
    {
        return $this->hasMany(Product::class, 'store_id', 'id');
    }
    protected function getLogoUrlAttribute()
    {
        $image = $this->logo_image;
        if (!$image) {
            return "https://www.incathlab.com/images/products/default_product.png";
        }
        if (Str::startsWith($image, ['http://', 'https://'])) {
            return $image;
        }
        return asset('storage/' . $image);

    }
}
