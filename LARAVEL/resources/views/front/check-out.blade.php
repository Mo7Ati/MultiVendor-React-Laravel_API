 <x-front-layout>
     <x-slot:title>
         Check Out
     </x-slot:title>

     <x-slot:breadcrumb>

     </x-slot:breadcrumb>
     <section class="checkout-wrapper section">
         <div class="container">
             <div class="row justify-content-center">
                 <div class="col-lg-8">
                     <div class="checkout-steps-form-style-1">
                         <ul id="accordionExample">
                             <li>
                                 <h6 class="title" data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                     aria-expanded="true" aria-controls="collapseThree">Your Personal Details </h6>
                                 <form action="{{ route('checkout.store') }}" method="POST">
                                     @csrf
                                     <section class="checkout-steps-form-content collapse show" id="collapseThree"
                                         aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                         <div class="row">

                                             <div class="col-md-12">
                                                 <div class="single-form form-default">
                                                     <label>User Name</label>
                                                     <div class="row">
                                                         <div class="col-md-6 form-input form">
                                                             <input type="text" placeholder="First Name"
                                                                 name="address[billing][first_name]">
                                                         </div>
                                                         <div class="col-md-6 form-input form">
                                                             <input type="text" placeholder="Last Name"
                                                                 name="address[billing][last_name]">
                                                         </div>
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="col-md-6">
                                                 <div class="single-form form-default">
                                                     <label>Email Address</label>
                                                     <div class="form-input form">
                                                         <input type="text" placeholder="Email Address"
                                                             name="address[billing][email]">
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="col-md-6">
                                                 <div class="single-form form-default">
                                                     <label>Phone Number</label>
                                                     <div class="form-input form">
                                                         <input type="text" placeholder="Phone Number"
                                                             name="address[billing][phone_number]">
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="col-md-6">
                                                 <div class="single-form form-default">
                                                     <label>City</label>
                                                     <div class="form-input form">
                                                         <input type="text" placeholder="City"
                                                             name="address[billing][city]">
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="col-md-6">
                                                 <div class="single-form form-default">
                                                     <label>Post Code</label>
                                                     <div class="form-input form">
                                                         <input type="text" placeholder="Post Code"
                                                             name="address[billing][postal_code]">
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="col-md-6">
                                                 <div class="single-form form-default">
                                                     <label>Country</label>
                                                     <div class="form-input form">
                                                         <input type="text" placeholder="Country"
                                                             name="address[billing][country]">
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="col-md-6">
                                                 <div class="single-form form-default">
                                                     <label>Country</label>
                                                     <div class="form-input form">
                                                         <input type="text" placeholder="state"
                                                             name="address[billing][state]">
                                                     </div>
                                                 </div>
                                             </div>
                                             <div class="col-md-12">
                                                 <div class="single-checkbox checkbox-style-3">
                                                     <input type="checkbox" id="checkbox-3" name="same_address">
                                                     <label for="checkbox-3"><span></span></label>
                                                     <p>My delivery and mailing addresses are the same.</p>
                                                 </div>
                                             </div>
                                             <div class="col-md-12">
                                                 <div class="single-form button">
                                                     <button class="btn" data-bs-toggle="collapse" type="button"
                                                         id="next-step" data-bs-target="#collapseFour"
                                                         aria-expanded="false" aria-controls="collapseFour"> Countinue
                                                     </button>
                                                 </div>
                                             </div>
                                         </div>
                                     </section>
                             </li>
                             <li id="shipping-address">
                                 <h6 class="title collapsed" data-bs-toggle="collapse" data-bs-target="#collapseFour"
                                     aria-expanded="false" aria-controls="collapseFour">Shipping Address</h6>
                                 <section class="checkout-steps-form-content collapse" id="collapseFour"
                                     aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                     <div class="row">
                                         <div class="col-md-12">
                                             <div class="single-form form-default">
                                                 <label>User Name</label>
                                                 <div class="row">
                                                     <div class="col-md-6 form-input form">
                                                         <input type="text" placeholder="First Name"
                                                             name="address[shipping][first_name]">
                                                     </div>
                                                     <div class="col-md-6 form-input form">
                                                         <input type="text" placeholder="Last Name"
                                                             name="address[shipping][last_name]">
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="col-md-6">
                                             <div class="single-form form-default">
                                                 <label>Email Address</label>
                                                 <div class="form-input form">
                                                     <input type="text" placeholder="Email Address"
                                                         name="address[shipping][email]">
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="col-md-6">
                                             <div class="single-form form-default">
                                                 <label>Phone Number</label>
                                                 <div class="form-input form">
                                                     <input type="text" placeholder="Phone Number"
                                                         name="address[shipping][phone_number]">
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="col-md-6">
                                             <div class="single-form form-default">
                                                 <label>City</label>
                                                 <div class="form-input form">
                                                     <input type="text" placeholder="City"
                                                         name="address[shipping][city]">
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="col-md-6">
                                             <div class="single-form form-default">
                                                 <label>Post Code</label>
                                                 <div class="form-input form">
                                                     <input type="text" placeholder="Post Code"
                                                         name="address[shipping][postal_code]">
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="col-md-6">
                                             <div class="single-form form-default">
                                                 <label>Country</label>
                                                 <div class="form-input form">
                                                     <input type="text" placeholder="Country"
                                                         name="address[shipping][country]">
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="col-md-6">
                                             <div class="single-form form-default">
                                                 <label>State</label>
                                                 <div class="form-input form">
                                                     <input type="text" placeholder="state"
                                                         name="address[shipping][state]">
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="col-md-12">
                                             <div class="checkout-payment-option">
                                                 <h6 class="heading-6 font-weight-400 payment-title">Select Delivery
                                                     Option</h6>
                                                 <div class="payment-option-wrapper">
                                                     <div class="single-payment-option">
                                                         <input type="radio" name="shipping"
                                                             id="shipping-1">
                                                         <label for="shipping-1">
                                                             <img src="https://via.placeholder.com/60x32"
                                                                 alt="Sipping">
                                                             <p>Standerd Shipping</p>
                                                             <span class="price">$10.50</span>
                                                         </label>
                                                     </div>
                                                     <div class="single-payment-option">
                                                         <input type="radio" name="shipping" id="shipping-2">
                                                         <label for="shipping-2">
                                                             <img src="https://via.placeholder.com/60x32"
                                                                 alt="Sipping">
                                                             <p>Standerd Shipping</p>
                                                             <span class="price">$10.50</span>
                                                         </label>
                                                     </div>
                                                     <div class="single-payment-option">
                                                         <input type="radio" name="shipping" id="shipping-3">
                                                         <label for="shipping-3">
                                                             <img src="https://via.placeholder.com/60x32"
                                                                 alt="Sipping">
                                                             <p>Standerd Shipping</p>
                                                             <span class="price">$10.50</span>
                                                         </label>
                                                     </div>
                                                     <div class="single-payment-option">
                                                         <input type="radio" name="shipping" id="shipping-4">
                                                         <label for="shipping-4">
                                                             <img src="https://via.placeholder.com/60x32"
                                                                 alt="Sipping">
                                                             <p>Standerd Shipping</p>
                                                             <span class="price">$10.50</span>
                                                         </label>
                                                     </div>
                                                 </div>
                                             </div>
                                         </div>
                                         <div class="col-md-12">
                                             <div class="steps-form-btn button">
                                                 <button class="btn" data-bs-toggle="collapse" type="submit"
                                                     data-bs-target="#collapseThree" aria-expanded="false"
                                                     aria-controls="collapseThree">Pay Now
                                                 </button>
                                             </div>
                                         </div>
                                     </div>
                                 </section>
                                 </form>
                             </li>
                         </ul>
                     </div>
                 </div>
                 <div class="col-lg-4">
                     <div class="checkout-sidebar">
                         <div class="checkout-sidebar-coupon">
                             <p>Appy Coupon to get discount!</p>
                             <form action="#">
                                 <div class="single-form form-default">
                                     <div class="form-input form">
                                         <input type="text" placeholder="Coupon Code">
                                     </div>
                                     <div class="button">
                                         <button class="btn">apply</button>
                                     </div>
                                 </div>
                             </form>
                         </div>
                         <div class="checkout-sidebar-price-table mt-30">
                             <h5 class="title">Pricing Table</h5>

                             <div class="sub-total-price">
                                 <div class="total-price">
                                     <p class="value">Subotal Price:</p>
                                     <p class="price">$144.00</p>
                                 </div>
                                 <div class="total-price shipping">
                                     <p class="value">Subotal Price:</p>
                                     <p class="price">$10.50</p>
                                 </div>
                                 <div class="total-price discount">
                                     <p class="value">Subotal Price:</p>
                                     <p class="price">$10.00</p>
                                 </div>
                             </div>

                             <div class="total-payable">
                                 <div class="payable-price">
                                     <p class="value">Subotal Price:</p>
                                     <p class="price">$164.50</p>
                                 </div>
                             </div>
                             <div class="price-table-btn button">
                                 <a href="javascript:void(0)" class="btn btn-alt">Checkout</a>
                             </div>
                         </div>
                         <div class="checkout-sidebar-banner mt-30">
                             <a href="product-grids.html">
                                 <img src="https://via.placeholder.com/400x330" alt="#">
                             </a>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </section>
     <!--====== Checkout Form Steps Part Ends ======-->

     <script>
         let input = document.querySelector("#checkbox-3");
         input.addEventListener('click', function($e) {
             let shippingAddress = document.querySelector("#shipping-address");
             shippingAddress.style.display = this.checked ? 'none' : 'block';

             let nextStepButton = document.querySelector("#next-step");

             let target = this.checked ? 'submit' : 'button';
             nextStepButton.setAttribute('type', target);
             nextStepButton.textContent = this.checked ? "Pay Now" : "Countinue"
             this.checked ? nextStepButton.setAttribute('data-bs-target', '#collapsefive') : nextStepButton
                 .setAttribute('data-bs-target', '#collapseFour');
             this.checked ? nextStepButton.setAttribute('aria-controls', 'collapsefive') : nextStepButton
                 .setAttribute('aria-controls', 'collapseFour');
         });
     </script>

 </x-front-layout>
