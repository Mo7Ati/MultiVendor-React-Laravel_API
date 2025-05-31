<?php

namespace App\View\Components\Front;

use App\Models\Product;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class ProductCard extends Component
{
    public $products;
    /**
     * Create a new component instance.
     */
    public function __construct()
    {
        $this->products = Product::latest('id')->take('8')->get();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.front.product-card');
    }
}
