<?php

namespace App\Http\Resources\stores;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            'description' => $this->description,
            "keywords" => $this->keywords,
            "store" => $this->whenLoaded('store', fn($store) => $store->name),
            "category" => $this->whenLoaded('category', fn($category) => $category->name),
            "price" => $this->price,
            "compare_price" => $this->compare_price,
            "is_active" => $this->is_active,
            "is_accepted" => $this->is_accepted,

        ];
    }
    public function serializeForEdit()
    {
        return [
            "id" => $this->id,
            "name" => $this->getTranslations('name'),
            'description' => $this->getTranslations('description'),
        ];
    }
}
