<?php

namespace App\Http\Resources\stores;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'payment_status' => $this->payment_status,
            'cancelled_reason' => $this->cancelled_reason,

            'customer' => $this->whenLoaded('customer', fn($customer) => $customer->name),
            'store' => $this->whenLoaded('store', fn($store) => $store->name),

            'total' => (float) $this->total,
            'total_items_amount' => (float) $this->total_items_amount,
            'total_amount' => (float) $this->total_amount,
            'delivery_amount' => (float) $this->delivery_amount,

            'notes' => $this->notes,
            'created_at' => $this->created_at ? $this->created_at->toDateTimeString() : null,
            'updated_at' => $this->updated_at ? $this->updated_at->toDateTimeString() : null,
        ];
    }
}
