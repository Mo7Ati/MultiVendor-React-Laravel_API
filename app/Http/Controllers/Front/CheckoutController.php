<?php

namespace App\Http\Controllers\Front;

use App\Events\OrderCreated;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\Order;
use App\Models\orderItems;
use App\Repositries\Cart\CartModelRepository;
use App\Repositries\Cart\CartRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Http;
use Laravel\Cashier\Cashier;
use Stripe\Stripe;
use Stripe\StripeClient;

class CheckoutController extends Controller
{

    public function __construct()
    {

    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('front.check-out');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, CartRepository $cart)
    {
        DB::beginTransaction();
        try {
            $items = $cart->get()->groupby('Product.store_id');

            foreach ($items as $store_id => $carts) {

                $total = $carts->sum(fn($cart) => $cart->quantity * $cart->product->price);
                $order = Order::create([
                    'store_id' => $store_id,
                    'user_id' => Auth::id(),
                    'status' => 'pending',
                    'payment_method' => 'COD',
                    'total' => $total,
                ]);
                //   dd($total);
                foreach ($carts as $cart) {
                    orderItems::create([
                        'order_id' => $order->id,
                        'product_id' => $cart->product_id,
                        'quantity' => $cart->quantity,
                        'price' => $cart->product->price,
                        'product_name' => $cart->product->name,
                    ]);
                }

                if ($request->has('same_address') && $request->post('same_address') === "on") {
                    $addresses = $request->post('address');
                    $addresses['shipping'] = $addresses['billing'];
                }
                foreach ($addresses as $type => $address) {
                    $address['type'] = $type;
                    $order->addresses()->create($address);
                }
                broadcast(new OrderCreated($order));
            }
            Db::commit();

        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }

        return redirect()->route('payments.create', $total);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
