<x-front-layout>
    <x-slot:title>
        Payment
    </x-slot:title>
    <x-slot:breadcrumb>

    </x-slot:breadcrumb>
    <div class="account-login section">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 offset-lg-3 col-md-10 offset-md-1 col-12">
                    <div id="checkout">

                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="https://js.stripe.com/v3/"></script>
    <script>
        const csrf_token = "{{csrf_token()}}";
    </script>
    @vite(['resources/js/checkout.js'])

</x-front-layout>
