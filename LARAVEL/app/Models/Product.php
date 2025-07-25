<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Laravel\Scout\Searchable;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;

class Product extends Model implements HasMedia
{
    use HasFactory, HasTranslations, InteractsWithMedia, Searchable;

    protected $fillable = [
        'name',
        'description',
        'keywords',
        'price',
        'compare_price',
        'store_id',
        'category_id',
        'is_active',
        'is_accepted',
        'quantity',
    ];

    protected $casts = [
        'name' => 'array',
        'address' => 'array',
        'keywords' => 'array',
    ];

    protected static function booted()
    {
        static::creating(function ($model) {
            $model->uuid = (string) Str::uuid();
        });
    }

    public array $translatable = ['name', 'description', 'keywords'];


    public function Store()
    {
        return $this->belongsTo(Store::class, 'store_id', 'id');
    }

    public function Category()
    {
        return $this->belongsTo(Category::class, 'category_id', 'id')
            ->withDefault(['name' => 'No Category']);
    }

    public function tags()
    {
        return $this->belongsToMany(Tag::class, 'product_tag', 'product_id', 'tag_id');
    }

    public function Cart()
    {
        return $this->hasMany(Cart::class, 'product_id', 'id');
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items', 'product_id', 'order_id');
    }

    public function toSearchableArray()
    {
        return [
            'name' => $this->name,
            'keywords' => $this->email,
            'description' => $this->description,
        ];
    }

}
