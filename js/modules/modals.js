const modals = () => {
  function createModals(triggerSelector, modalSelector, closeSelector) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector);
    trigger.forEach(item => {
      item.addEventListener('click', (e) => {
        if (e.target) {
          e.preventDefault();
        }
        modal.style.display = "block";
        document.body.style.overflow = "hidden";

      });
    });

    close.addEventListener('click', () => {
      modal.style.display = "none";
      document.body.style.overflow = '';
    });
  };

  createModals('.user-nav__profile', '.popup__user', '.popup__close');
  createModals('.user-nav__wishlist', '.popup-wishlist', '.popup-wishlist__close');
  createModals('.cart__link', '.popup-cart', '.popup-cart__close');
  statusProductsInWishlist();
  statusProductsInCart();
};

export default modals;
