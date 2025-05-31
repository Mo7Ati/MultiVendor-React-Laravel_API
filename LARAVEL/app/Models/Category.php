<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'image',
        'parent_id',
        'description',
        'slug',
        'status',
    ];

    protected $appends = [
        'image_url',
    ];

    protected function casts(): array
    {
        return [
            'parent_id' => 'integer' ,
        ];
    }

    protected static function booted()
    {
        static::creating(function (Category $category) {
            $slug = Str::slug($category->name);
            $category->slug = $slug;
        });
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id', 'id');

    }

    public function products()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }

    public function scopeFilter(Builder $query, $filters)
    {
        $query->when($filters['name'] ?? false, function ($query, $value) {
            $query->where('name', 'LIKE', "%$value%");
        });

        $query->when($filters['status'] ?? false, function ($query, $value) {
            $query->where('status', 'LIKE', "%$value%");
        });
    }

    public function getImageUrlAttribute()
    {
        $image = $this->image;
        if (!$image) {
            return 'https://www.incathlab.com/images/products/default_product.png';
        }

        if (Str::startsWith($image, ['http', 'https'])) {
            return $image;
        }

        return asset('storage/' . $image);
    }
}
