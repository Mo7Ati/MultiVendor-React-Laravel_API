<?php

namespace App\Http\Resources\stores;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreCategoryResource extends JsonResource
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
