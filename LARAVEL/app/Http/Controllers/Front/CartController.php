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
        $product = Product::where('id', $request->post('product_id'))->first();
        $quantity = $request->post('quantity', 1);

        return $this->cart->add($product, $quantity);

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {

        $product = Product::where('id', $id);
        $quantity = $request->post('quantity');


        $this->cart->update($product, $quantity);
        return redirect()->route('cart.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {

        $product = Product::where('id', $id)->first();
        return $this->cart->delete($product);

    }
}
