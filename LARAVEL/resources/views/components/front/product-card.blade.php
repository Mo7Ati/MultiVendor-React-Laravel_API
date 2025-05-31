@foreach ($products as $product)
    <div class="col-lg-3 col-md-6 col-12">
        <!-- Start Single Product -->
        <div class="single-product">
            <div class="product-image">
                <img src="{{ $product->image_url }}" alt="#">
                <span class="sale-tag">-25%</span>
                <div class="button">
                    <button class="submit btn" onClick="addToCart({{ $product }})">
                        <i class="lni lni-cart"></i>
                        Add To Cart
                    </button>
                </div>
            </div>
            <div class="product-info">
                <span class="category">{{ $product->Category->name }}</span>
                <h4 class="title">
                    <a href="{{ route('product.show', $product->slug) }}">{{ $product->name }}</a>
                </h4>
                <ul class="review">
                    <li><i class="lni lni-star-filled"></i></li>
                    <li><i class="lni lni-star-filled"></i></li>
                    <li><i class="lni lni-star-filled"></i></li>
                    <li><i class="lni lni-star-filled"></i></li>
                    <li><i class="lni lni-star"></i></li>
                    <li><span>4.0 Review(s)</span></li>
                </ul>
                <div class="price">
                    <span>{{ $product->price }}</span>
                    <span class="discount-price">{{ $product->compare_price }}</span>
                </div>
            </div>
        </div>
        <!-- End Single Product -->
    </div>
@endforeach
