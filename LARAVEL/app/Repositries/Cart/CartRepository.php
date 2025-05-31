<?php

namespace App\Repositries\Cart;

use App\Models\Cart;
use App\Models\Product;

interface CartRepository
{
    public function get();
    public function add(Product $product, $quantity);

    public function update(Product $product, $quantity);

    public function delete(Product $product);

    public function empty();
    public function total();


}
