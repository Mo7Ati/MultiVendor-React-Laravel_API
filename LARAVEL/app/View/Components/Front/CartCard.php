<?php

namespace App\View\Components\Front;

use App\Repositries\Cart\CartModelRepository;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class CartCard extends Component
{
    public $items;
    /**
     * Create a new component instance.
     */
    public function __construct(CartModelRepository $cart)
    {
        $this->items = $cart->get();
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.front.cart-card');
    }
}
