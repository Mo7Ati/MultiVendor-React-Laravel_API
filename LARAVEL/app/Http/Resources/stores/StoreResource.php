<?php

namespace App\Http\Resources\stores;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
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
            'keywords' => $this->keywords,
            'address' => $this->address,
            'social_media' => $this->social_media,
            'email' => $this->email,
            'phone' => $this->phone,
            "password" => $this->password,
            "delivery_time" => $this->delivery_time,
            "is_active" => $this->is_active,
            "rate" => $this->rate,
            "logo_url" => $this->whenLoaded('media', $this->getFirstMediaUrl('stores-logo')),
        ];
    }

    public function serializeForEdit(): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            'description' => $this->description,
            'keywords' => $this->keywords,
            'address' => $this->address,
            'social_media' => $this->social_media,
            'email' => $this->email,
            'phone' => $this->phone,
            "password" => $this->password,
            "delivery_time" => $this->delivery_time,
            "is_active" => $this->is_active,
            "rate" => $this->rate,
            "logo_url" => $this->whenLoaded('media', $this->getFirstMediaUrl('stores-logo')),
        ];
    }


}
