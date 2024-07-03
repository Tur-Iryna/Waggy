window.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-cart')) {
    const card = e.target.closest('.products-content__item');
    const productInfo = {
      id: card.dataset.id,
      imgSrc: card.querySelector('.products-content__img').getAttribute('src'),
      title: card.querySelector('.products-content__title').innerText,
      price: card.querySelector('.products-content__price').innerText
    };
    addItemToCart(productInfo);
  };

  if (e.target.dataset.action === 'minus') {
    const wrapperCounter = e.target.closest('.cart-item__counter');
    let counterEl = wrapperCounter.querySelector('[data-counter]');
    if (counterEl.innerText > 0)
      counterEl.innerText = --counterEl.innerText;
  };

  if (e.target.dataset.action === 'plus') {
    const wrapperCounter = e.target.closest('.cart-item__counter');
    let counterEl = wrapperCounter.querySelector('[data-counter]');
    counterEl.innerText = ++counterEl.innerText;
  };
  cartCalcPrice();

  const deleteCard = document.querySelectorAll('.cart-item__delete'),
    cartItems = document.querySelectorAll('.cart-item'),
    cartItemCount = cartItems.length;
    deleteCard.forEach(button => {
    button.addEventListener('click', () => {
      const cartItem = button.closest('.cart-item');
      cartItem.remove();
      const cartItems = document.querySelectorAll('.cart-item');
      const cartItemCount = cartItems.length;
      cartNum.innerText = cartItemCount;
      if (cartItemCount === 0) {
        cartNum.innerText = 0;
        statusProductsInCart();
      }
    });
  });
});

const cartWrapper = document.querySelector('.popup-cart__content'),
  cartNum = document.querySelector('.cart__num'),
  cartTitle = document.querySelector('.popup-cart__title'),
  cartPrice = document.querySelector('.popup-cart__total');

function addItemToCart(productInfo) {
  const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
  if (itemInCart) {
    const counterEl = itemInCart.querySelector('[data-counter]');
    counterEl.innerText = parseInt(counterEl.innerText) + 1;
  } else {
    const cardItem = `
  <div class="cart-item" data-id="${productInfo.id}">
  <div class="cart-item__image">
    <a class="cart-item__link" href="#">
      <img class="cart-item__img" src="${productInfo.imgSrc}" alt="собака">
    </a>
  </div>
  <div class="cart-item__content">
    <a class="cart-item__content-link" href="#">
      <h4 class="cart-item__content-title">${productInfo.title}</h4>
    </a>
    <span class="cart-item__content-price">${productInfo.price}</span>
  </div>
  <div class="cart-item__counter">
    <div class="cart-item__counter-minus" data-action="minus">-</div>
    <span class="cart-item__counter-number" data-counter>1</span>
    <div class="cart-item__counter-plus" data-action="plus">+</div>
  </div>
  <div class="cart-item__delete">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0,0,256,256"
      width="24px" height="24px" fill-rule="nonzero">
      <g fill-opacity="0.27843" fill="#000000" fill-rule="nonzero" stroke="none" stroke-width="1"
        stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray=""
        stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none"
        style="mix-blend-mode: normal">
        <g transform="scale(10.66667,10.66667)">
          <path d="M10,2l-1,1h-6v2h18v-2h-6l-1,-1zM4.36523,7l1.70313,15h11.86328l1.70313,-15z"></path>
        </g>
      </g>
    </svg>
  </div>
</div>`;
    cartWrapper.insertAdjacentHTML('beforeend', cardItem);
    cartNum.innerText = parseInt(cartNum.innerText) + 1;
    cartTitle.innerText = 'Ваше замовлення';
    cartPrice.style.display = 'block';
    statusProductsInCart();
  };
};

function cartCalcPrice() {
  const cartItems = document.querySelectorAll('.cart-item');
  let totalPrice = 0;
  cartItems.forEach(item => {
    const totalPriceEl = document.querySelector('.popup-cart__price');
    const amountEl = item.querySelector('[data-counter]');
    const priceEl = item.querySelector('.cart-item__content-price');
    const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
    totalPrice += currentPrice;
    totalPriceEl.innerText = totalPrice;
  });
};

function statusProductsInCart() {
  if (cartWrapper.children.length >= 2) {
    cartWrapper.style.overflowY = "scroll";
  } else if (cartWrapper.children.length === 0) {
    cartTitle.innerText = 'Ваш кошик пустий';
    cartPrice.style.display = 'none';
  }
}
