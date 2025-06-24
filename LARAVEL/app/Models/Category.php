<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\Translatable\HasTranslations;
class Category extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia, HasTranslations;
    protected $fillable = [
        'name',
        'description',
        'is_active',
    ];

    public array $translatable = ['name', 'description'];

    protected $appends = [
        'image_url',
    ];

    protected function casts(): array
    {
        return [
            'name' => 'array',
            'description' => 'array',
        ];
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
        $image = $this->getFirstMediaUrl('categories');

        if (!$image) {
            return 'https://www.incathlab.com/images/products/default_product.png';
        }

        if (Str::startsWith($image, ['http', 'https'])) {
            return asset($image);
        }
    }
}
