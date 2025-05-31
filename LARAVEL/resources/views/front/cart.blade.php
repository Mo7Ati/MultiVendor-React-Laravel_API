<x-front-layout>
    <x-slot:title>
        Cart
    </x-slot:title>

    <x-slot:breadcrumb>

    </x-slot:breadcrumb>

    <!-- Shopping Cart -->
    <div class="shopping-cart section">
        <div class="container">
            <div class="cart-list-head">
                <!-- Cart List Title -->
                <div class="cart-list-title">
                    <div class="row">
                        <div class="col-lg-1 col-md-1 col-12">

                        </div>
                        <div class="col-lg-4 col-md-3 col-12">
                            <p>Product Name</p>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                            <p>Quantity</p>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                            <p>Subtotal</p>
                        </div>
                        <div class="col-lg-2 col-md-2 col-12">
                            <p>Discount</p>
                        </div>
                        <div class="col-lg-1 col-md-2 col-12">
                            <p>Remove</p>
                        </div>
                    </div>
                </div>
                <!-- End Cart List Title -->
                @foreach ($items->get() as $item)
                    <!-- Cart Single List list -->
                    <div class="cart-single-list">
                        <div class="row align-items-center">
                            <div class="col-lg-1 col-md-1 col-12">
                                <a href="product-details.html"><img src="{{ $item->Product->image_url }}"
                                        alt="#"></a>
                            </div>
                            <div class="col-lg-4 col-md-3 col-12">
                                <h5 class="product-name"><a href="product-details.html">
                                        {{ $item->product->name }}</a></h5>

                            </div>

                            <div class="col-lg-2 col-md-2 col-12">
                                <form action="{{ route('cart.update', $item->product->id) }}" method="POST"
                                    id="cart-update">
                                    @csrf
                                    @method('put')
                                    <div class="form-control-sm">
                                        <input type="text" name="quantity" value="{{ $item->quantity }}">
                                    </div>
                                </form>
                            </div>
                            <div class="col-lg-2 col-md-2 col-12">
                                <p> {{ $item->product->price }}</p>
                            </div>
                            <div class="col-lg-2 col-md-2 col-12">
                                <p> {{ $item->product->compare_price }}</p>
                            </div>
                            <div class="col-lg-1 col-md-2 col-12">
                                <form action="{{ route('cart.destroy', $item->product->id) }}" method="POST">
                                    @csrf
                                    @method('delete')

                                    <button type="submit" class="remove-item">
                                        <i class="lni lni-close"></i>
                                    </button>

                                </form>
                            </div>
                        </div>
                    </div>
                @endforeach
                <!-- End Single List list -->
            </div>
            <div class="row">
                <div class="col-12">
                    <!-- Total Amount -->
                    <div class="total-amount">
                        <div class="row">
                            <div class="col-lg-8 col-md-6 col-12">
                                <div class="left">
                                    <div class="coupon">
                                        <form action="#" target="_blank">
                                            <input name="Coupon" placeholder="Enter Your Coupon">
                                            <div class="button">
                                                <button class="btn">Apply Coupon</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6 col-12">
                                <div class="right">
                                    <ul>
                                        <li>Cart Subtotal<span>$2560.00</span></li>
                                        <li>Shipping<span>Free</span></li>
                                        <li>You Save<span>$29.00</span></li>
                                        <li class="last">You Pay<span>$2531.00</span></li>
                                    </ul>
                                    <div class="button">
                                        <a href="checkout.html" class="btn">Checkout</a>
                                        <a href="product-grids.html" class="btn btn-alt">Continue shopping</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--/ End Total Amount -->
                </div>
            </div>
        </div>
    </div>
    <!--/ End Shopping Cart -->



</x-front-layout>
