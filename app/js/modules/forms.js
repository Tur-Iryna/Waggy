

export const formsSubmit = () => {
  const formBox = document.querySelectorAll('[data-form]'),
    inputs = document.querySelectorAll('[data-input]');

  const message = {
    loading: 'Загрузка...',
    success: 'Дякуємо',
    failure: 'Щось пішло не так...'

  };


  const postData = async (url, data) => {
    document.querySelector('.status').textContent = message.loading;
    let result = await fetch(url, {
      method: "POST",
      body: data
    });

    return await result.text();
  }

  const clearInput = () => {
    inputs.forEach(item => {
      item.value = "";
    })
  }

  formBox.forEach(element => {
    element.addEventListener('submit', (e) => {
      e.preventDefault();


      let messageStatus = document.createElement('div');
      messageStatus.classList.add('status');
      const modalContent = document.querySelector('.popup-cart__total');
      modalContent.innerHTML = '';
      modalContent.appendChild(messageStatus);


      const formData = new FormData(element);
      postData('server.php', formData)
        .then(result => {
          console.log(result);
          const cartNum = document.querySelector('.cart__num');
          cartNum.innerText = 0;
          messageStatus.textContent = message.success;

        })
        .catch(() => messageStatus.textContent = message.failure)
        .finally(() => {
          clearInput();
          setTimeout(() => {

            messageStatus.remove();
          }, 3000);
        })
    })
  })
}

