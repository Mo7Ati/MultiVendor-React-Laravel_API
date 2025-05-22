<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'store_id',
        'user_id',
        'number',
        'status',
        'total',
        'payment_status',
        'payment_method',
    ];



    protected static function booted()
    {
        static::creating(function (Order $order) {
            $order->number = static::getNextOrderNumber();

        });
    }

    public function products()
    {
        return $this->belongsToMany(Product::class, 'order_items', 'order_id', 'product_id')
            ->using(orderItems::class)
            ->withPivot('quantity', 'price', 'product_name')
        ;
    }

    public function store()
    {
        return $this->belongsTo(Store::class);
    }

    public function addresses()
    {
        return $this->hasMany(orderAddress::class);
    }

    public static function getNextOrderNumber()
    {
        $year = Carbon::now()->year;
        $last_order = Order::latest('id')->whereYear('created_at', $year)->first();

        if (!$last_order) {
            return "$year" . '0001';
        }
        return $last_order->number + 1;
    }

}
