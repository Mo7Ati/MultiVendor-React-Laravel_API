import axios from "axios";

window.addToCart = (product) => {
    axios.post('/cart', {
        'product_id': product.id,
    }).then(response => {
        updateCartUI(response.data);
    });
}


window.deleteItemFromCart = (productId) => {
    axios.delete(`/cart/${productId}`).then(response => {
        deleteCartItemFromUi(response.data);
    });
}

window.updateCartUI = (item) => {
    const exists = document.querySelector(`#cart-${item.product_id}`);
    const ul = document.querySelector("#cart-card");
    const li = document.createElement('li');
    const total_items = document.querySelectorAll(".items-quantity");


    if (exists) {
        const quantity = Number(document.querySelector(`#quantity-${item.product_id}`).innerHTML) + 1;
        document.querySelector(`#quantity-${item.product_id}`).innerHTML = quantity;
        return;
    }

    li.id = `cart-${item.product_id}`
    li.innerHTML = `
                <button class="remove" type="submit" onClick="deleteItemFromCart( ${item.product_id} )">
                    <i class="lni lni-close"></i>
                </button>
                <div class="cart-img-head">
                    <a class="cart-img" href="/product/${item.product_id}'"><img
                            src="${item.product.image_url}" alt="#"></a>
                </div>
                <div class="content">
                    <h4><a href="product-details.html">${item.product.name}</a></h4>
                    <p class="quantity"><span id="quantity-${item.product_id}">${item.quantity}</span>x - <span
                            class="amount">$${item.product.price}</span></p>
                </div>
    ` ;
    total_items.forEach(element => {
        element.innerHTML = Number(element.innerHTML) + 1;
    });

    ul.appendChild(li);
}

window.deleteCartItemFromUi = (item) => {
    const total_items = document.querySelectorAll(".items-quantity");
    const cart = document.querySelector(`#cart-${item.product_id}`);

    if (cart) {
        cart.style.display = "none";
        total_items.forEach(element => {
            element.innerHTML = Number(element.innerHTML) - 1;
        });
    }
}



