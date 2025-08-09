<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'status',
        'payment_status',
        'cancelled_reason',
        'customer_id',
        'customer_data',
        'store_id',
        'total',
        'total_items_amount',
        'total_amount',
        'delivery_amount',
        'notes',
    ];

    protected $casts = [
        'customer_data' => 'array',
        'total' => 'float',
        'total_items_amount' => 'float',
        'total_amount' => 'float',
        'delivery_amount' => 'float',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /*
     * Relationships
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items', 'order_id', 'product_id')
            ->using(orderItems::class)
            ->withPivot('quantity', 'price', 'product_name')
        ;
    }
    public function addresses()
    {
        return $this->hasMany(orderAddress::class);
    }
}
