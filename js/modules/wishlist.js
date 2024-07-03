const wishlistBtn = document.querySelectorAll('[data-wishlist]'),
  wishlistWrapper = document.querySelector('.popup-wishlist__content'),
  wishlistAddCart = document.querySelector('.popup-wishlist__btn'),
  wishlistCheckbox = document.querySelectorAll('.wishlist');

function changeColorImage(item) {
  wishlistBtn.forEach((item) => {
    item.addEventListener('click', () => {
      const svg = item.querySelector('svg path');
      svg.style.fill = 'red';
      item.classList.add('selected');
    });
  });
};

function updateColorImage(item) {
  const svg = item.querySelector('svg path');
  svg.style.fill = 'black';
  item.classList.remove('selected');
};

window.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-wishlist')) {
    const wishlistCard = e.target.closest('.products-content__item');
    const productWishlist = {
      id: wishlistCard.dataset.id,
      imgSrc: wishlistCard.querySelector('.products-content__img').getAttribute('src'),
      title: wishlistCard.querySelector('.products-content__title').innerText,
      price: wishlistCard.querySelector('.products-content__price').innerText,
    };

    const wishlistContent = `
    <div class="wishlist-item" data-id="${productWishlist.id}">
         <input class="wishlist" type="checkbox">      
           <div class="wishlist-item__image">
            <a class="wishlist-item__link" href="#">
              <img class="wishlist-item__img" src="${productWishlist.imgSrc}" alt="собака">
            </a>
          </div>
          <div class="wishlist-item__content">
            <a class="wishlist-item__content-link" href="#">
              <h4 class="wishlist-item__content-title">${productWishlist.title}</h4>
            </a>
            <span class="wishlist-item__content-price">${productWishlist.price}</span>
          </div>
          <div class="wishlist-item__delete">
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

    wishlistWrapper.insertAdjacentHTML('beforeend', wishlistContent);
    changeColorImage();
    statusProductsInWishlist();
  };

  const wishlistBtnDelete = document.querySelectorAll('.wishlist-item__delete');
  wishlistBtnDelete.forEach(button => {
    button.addEventListener('click', () => {
      const wishlistBtnItem = button.closest('.wishlist-item');
      console.log(wishlistBtnItem);
      wishlistBtnItem.remove();
      statusProductsInWishlist();
      updateColorImage();
    });
  });
});

wishlistCheckbox.forEach(elem => {
  elem.addEventListener('click', () => {
    const wishlistItem = elem.closest('.wishlist-item');
    if (elem.checked) {
      selectedProductsToCart();
    };
  });
})

function statusProductsInWishlist() {
  const wishlistBtn = document.querySelector('.popup-wishlist__btn');
  if (wishlistWrapper.children.length >= 2) {
    wishlistWrapper.style.overflowY = "scroll";
  } else if (wishlistWrapper.children.length === 0) {
    wishlistBtn.style.display = 'none';
  } else if (wishlistWrapper.children.length > 0) {
    wishlistBtn.style.display = 'block';
  };
};

function selectedProductsToCart() {
  const selectedWishlistItems = document.querySelectorAll('.wishlist-item[data-id] input:checked');
  selectedWishlistItems.forEach(item => {
    const wishlistItem = item.closest('.wishlist-item');
    const productInfo = {
      id: wishlistItem.dataset.id,
      imgSrc: wishlistItem.querySelector('.wishlist-item__img').getAttribute('src',),
      title: wishlistItem.querySelector('.wishlist-item__content-title').innerText,
      price: wishlistItem.querySelector('.wishlist-item__content-price').innerText
    };
    addItemToCart(productInfo);
    wishlistItem.remove();
  });
  statusProductsInWishlist();
  statusProductsInCart();
};

wishlistAddCart.addEventListener('click', () => {
  selectedProductsToCart();
});
