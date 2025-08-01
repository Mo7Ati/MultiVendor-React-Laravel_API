<?php

namespace App\Http\Resources\stores;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
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
            "permission_count" => $this->whenCounted('permissions'),
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
