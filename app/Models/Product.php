<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'slug',
        'description',
        'image',
        'price',
        'compare_price',
        'store_id',
        'category_id',
        'status',
    ];
    protected function casts(): array
    {
        return [
            'category_id' => 'integer',
            'store_id' => 'integer',
        ];
    }
    protected $appends = ['image_url', 'tags'];

    protected static function booted()
    {
        static::creating(function (Product $product) {
            $product->slug = Str::slug($product->name);
        });
    }

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

    protected function getImageUrlAttribute()
    {
        $image = $this->image;
        if (!$image) {
            return "https://www.incathlab.com/images/products/default_product.png";
        }
        if (Str::startsWith($image, ['http://', 'https://'])) {
            return $image;
        }
        return asset('storage/' . $image);

    }

    protected function getTagsAttribute()
    {
        return $this->tags()->pluck('name');
    }

}
