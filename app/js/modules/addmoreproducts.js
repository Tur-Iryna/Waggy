const categoryButtons = document.querySelectorAll('[data-button]');
let productsToAdd = 5;
let itemsLoaded = 0;

categoryButtons.forEach(button => {
  button.addEventListener('click', async () => {
    const currentCategory = button.getAttribute('data-category');
    itemsLoaded = 0;
    let containerBox = '';

    if (currentCategory === 'foodies') {
      containerBox = '.foodies__content-items';
    } else if (currentCategory === 'clothing') {
      containerBox = '.products-content__items';
    } else if (currentCategory === 'popular-products') {
      containerBox = '.popular-products__items';
    }
    const container = document.querySelector(containerBox);
    await loadProducts(currentCategory, container);
  });
});

async function loadProducts(category, container) {
  try {
    const response = await fetch('json/products.json');
    const data = await response.json();

    const loadItems = data.products[category].slice(itemsLoaded, itemsLoaded + productsToAdd);
    loadItems.forEach(product => {
      const productInfo = `
            <div class="products-content__item" data-id="${product.id}">
      <div class="products-content__image">
        <a class="products-content__link" href="#">
        <img class="products-content__img" src="images/${category}/${product.image}" alt="${product.title}">

        </a>
        ${product.sale ? `<span class="products-content__sale">${product.sale}</span>` : ''}
      ${!product.sale && product.position ? `<span class="products-content__position">${product.position}</span>` : ''}
      </div >
        <div class="products-content__box">
          <a class="products-content__link" href="#">
            <h4 class="products-content__title">${product.title}</h4>
          </a>
          <div class="star" data-rateyo-rating="${product.rating}"></div>
          <span class="products-content__price">${product.price}</span>
          <div class="products-content__buttons">
            <button class="products-content__btn" type="submit" data-cart>Додати в кошик</button>
            <div class="products-content__wishlist">
              <button class="products-content__link-icon" data-wishlist>
                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.447 1.38889C12.7345 0.0337844 10.1877 0.27753 8.61584 1.78353L8.00023 2.37258L7.38462 1.78353C5.8159 0.27753 3.26595 0.0337844 1.55348 1.38889C-0.408984 2.94422 -0.512107 5.73569 1.24411 7.4216L7.29087 13.2193C7.68149 13.5936 8.31585 13.5936 8.70647 13.2193L14.7532 7.4216C16.5126 5.73569 16.4094 2.94422 14.447 1.38889Z" fill="#41403E" />
                </svg>
              </button>
            </div>
          </div>
        </div>
    </div >
      `;
      container.insertAdjacentHTML('beforeend', productInfo);
    });

    itemsLoaded += productsToAdd;
    if (itemsLoaded >= data.products[category].length) {
      categoryButtons.forEach(button => {
        if (button.getAttribute('data-category') === category) {
          button.style.display = 'none';
        }
      });
    }
  } catch (error) {
    console.error('Error loading products:', error);
  }
}


