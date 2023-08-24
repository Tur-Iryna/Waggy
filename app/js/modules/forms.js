

export const formsSubmit = () => {
  const formBox = document.querySelectorAll('form'),
    inputs = document.querySelectorAll('input');

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
      element.appendChild(messageStatus);


      const formData = new FormData(element);
      postData('server.php', formData)
        .then(result => {
          console.log(result);
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

