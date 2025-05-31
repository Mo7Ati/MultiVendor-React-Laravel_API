<?php

namespace App\Listeners;

use App\Events\OrderCreated;
use App\Repositries\Cart\CartRepository;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class ProductDecrement
{
    public $cart;
    /**
     * Create the event listener.
     */
    public function __construct(CartRepository $cart)
    {
        $this->cart = $cart;
    }

    /**
     * Handle the event.
     */
    public function handle(OrderCreated $event): void
    {
        $items = $this->cart->get();
        foreach ($items as $item) {
            $item->product()->decrement('quantity', $item->quantity);
        }
    }
}
