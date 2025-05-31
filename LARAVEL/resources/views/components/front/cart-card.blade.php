<a href="javascript:void(0)" class="main-btn">
    <i class="lni lni-cart"></i>
    <span class="total-items"><span class="items-quantity">{{ $items->count() }}</span></span>
</a>
<div class="shopping-item">
    <div class="dropdown-cart-header">
        <span><span class="items-quantity">{{ $items->count() }}</span> Items</span>
        <a href="{{ route('cart.index') }}">View Cart</a>
    </div>
    <ul class="shopping-list" id="cart-card">
        @foreach ($items as $item)
            <li id="cart-{{ $item->product->id }}">
                <button class="remove" type="submit" onClick="deleteItemFromCart({{ $item->product_id }})">
                    <i class="lni lni-close"></i>
                </button>
                <div class="cart-img-head">
                    <a class="cart-img" href="{{ route('product.show', $item->product) }}"><img
                            src="{{ $item->product->image_url }}" alt="#"></a>
                </div>
                <div class="content">
                    <h4><a href="product-details.html">{{ $item->product->name }}</a></h4>
                    <p><span id="quantity-{{ $item->product_id }}">{{ $item->quantity }}</span>x - <span
                            class="amount">${{ $item->product->price }}</span></p>
                </div>
            </li>
        @endforeach
    </ul>
    <div class="bottom">
        <div class="total">
            <span>Total</span>
            <span class="total-amount">$134.00</span>
        </div>
        <div class="button">
            <a href="{{ route('checkout.index') }}" class="btn animate">Checkout</a>
        </div>
    </div>
</div>
<!--/ End Shopping Item -->
