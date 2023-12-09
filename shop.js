if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    //слушатели событий для кнопок удаления, добавления товара, очистки корзины
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    addItemToCart(title, price)
    updateCartTotal()
}

var cart = []; // Массив для хранения товаров в корзине

function purchaseClicked() {

    cart = [];   //очищаем массив
    // Обновляем отображение корзины и итоговую стоимость
    updateCartDisplay();
    updateCartTotal();
}

function addItemToCart(title, price) {
    var cartItem = {
        title: title,
        price: price,
        quantity: 1
    };

    // Проверка наличия товара в корзине
    var existingItemIndex = cart.findIndex(item => item.title === title);

    if (existingItemIndex !== -1) {
        // Если товар уже есть в корзине, увеличиваем количество
        cart[existingItemIndex].quantity++;
    } else {
        // Иначе добавляем новый товар в корзину
        cart.push(cartItem);
    }

    // Обновляем отображение корзины
    updateCartDisplay();
}

function updateCartDisplay() {
    var cartItemsContainer = document.getElementsByClassName('cart-items')[0];
    cartItemsContainer.innerHTML = '';

    for (var i = 0; i < cart.length; i++) {
        var cartItem = cart[i];

        var cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');

        var cartRowContents = `
            <div class="cart-item cart-column">
                <span class="cart-item-title">${cartItem.title}</span>
            </div>
            <span class="cart-price cart-column">${cartItem.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" type="number" value="${cartItem.quantity}" readonly>
                <button class="btn btn-danger" type="button">Удалить</button>
            </div>`;

        cartRow.innerHTML = cartRowContents;
        cartItemsContainer.appendChild(cartRow);
    }

    // Добавляем обработчики событий для кнопок удаления
    var removeCartItemButtons = document.getElementsByClassName('btn-danger');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    // Обновляем итоговую стоимость корзины
    updateCartTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartItemTitle = buttonClicked.parentElement.parentElement.getElementsByClassName('cart-item-title')[0].innerText;

    // Удаляем товар из массива корзины
    cart = cart.filter(item => item.title !== cartItemTitle);

    // Обновляем отображение корзины
    updateCartDisplay();
    updateCartTotal();
}

function updateCartTotal() {
    var cartTotalPriceElement = document.getElementsByClassName('cart-total-price')[0];
    var total = 0;

    for (var i = 0; i < cart.length; i++) {
        var cartItem = cart[i];
        var price = parseFloat(cartItem.price.replace('₽',''));
        var quantity = cartItem.quantity;
        total += price * quantity;
    }

    total = Math.round(total * 100) / 100;
    cartTotalPriceElement.innerText = '₽' + total;
}
