<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class orderItems extends Pivot
{


    protected $table = 'order_items';
    public $timestamps = false;
    protected $fillable = [
        'price' , 'quantity' , 'product_name' , 'order_id' , 'product_id'
    ] ;

    public function order()
    {
        return $this->belongsTo(Order::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
