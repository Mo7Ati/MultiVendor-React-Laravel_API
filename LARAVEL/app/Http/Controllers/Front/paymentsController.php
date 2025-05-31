<?php

namespace App\Http\Controllers\front;

use App\Events\OrderCreated;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use stripe;
use Stripe\StripeClient;

class paymentsController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create($total)
    {
        return view('front.payment', [
            'order' => $total,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $stripe = new StripeClient(config('services.stripe.secret_key'));
        // header('Content-Type: application/json');

        // $price = $stripe->prices->create([
        //     'currency' => 'usd',
        //     'unit_amount' => 1000,
        //     //'recurring' => ['interval' => 'month'],
        //     'product_data' => ['name' => 'Gold Plan'],
        // ]);

        // $YOUR_DOMAIN = 'http://localhost:8000';

        // $checkout_session = $stripe->checkout->sessions->create([
        //     'ui_mode' => 'embedded',
        //     'line_items' => [
        //         [
        //             'price' => $price->id,
        //             'quantity' => 1,
        //         ]
        //     ],
        //     'mode' => 'payment',
        //     'return_url' => 'http://localhost:8000/?session_id={CHECKOUT_SESSION_ID}',
        // ]);

        // return [
        //     'clientSecret' => $checkout_session->client_secret,
        // ];
    }

}
