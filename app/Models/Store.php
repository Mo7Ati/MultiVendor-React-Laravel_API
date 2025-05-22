<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Store extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'logo_image',
        'description',
        'slug',
        'status',
    ];
    protected $appends = [
        'logo_url',
    ];

    protected static function booted()
    {
        static::creating(function (Store $store) {
            $store->slug = Str::slug($store->name);
        });
    }

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
