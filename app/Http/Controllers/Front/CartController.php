<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Product;
use App\Repositries\Cart\CartModelRepository;
use App\Repositries\Cart\CartRepository;
use Illuminate\Http\Request;
use Route;

class CartController extends Controller
{

    public $cart;

    public function __construct(CartRepository $cart)
    {
        $this->cart = $cart;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $items = $this->cart;
        return view('front.cart', compact('items'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $product = Product::find($request->post('product_id'));

        $quantity = $request->post('quantity');
        if (!$quantity) {
            $quantity = 1;
        }

        $this->cart->add($product, $quantity);
        return redirect()->route('cart.index');
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $product = Product::findOrFail($id);
        $quantity = $request->post('quantity');


        $this->cart->update($product, $quantity);
        return redirect()->route('cart.index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $this->cart->delete($product);

        return redirect()->route('cart.index');

    }
}
