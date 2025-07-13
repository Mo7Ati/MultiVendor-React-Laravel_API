<?php

namespace App\Http\Resources\stores;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreEditResource extends JsonResource
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
            "name" => $this->getTranslations('name'),
            'description' => $this->getTranslations('description'),
            'keywords' => $this->getTranslations('keywords'),
            'address' => $this->getTranslations('address'),
            'social_media' => $this->social_media,
            'email' => $this->email,
            'phone' => $this->phone,
            "password" => $this->password,
            "delivery_time" => $this->delivery_time,
            "is_active" => $this->is_active,
            "rate" => $this->rate,
            "logo" => $this->getFirstMedia('stores-logo'),
            "gallery" => $this->getMedia('stores-gallery')->toArray(),
        ];
    }
}
