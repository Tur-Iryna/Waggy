const blogContainer = document.querySelector('.blog__items'),
  blogBtn = document.querySelector('.blog__info-button');
let blogItemsAdd = 4;
let blogItemsLoaded = 0;

blogBtn.addEventListener('click', loadedBlogItems);

async function loadedBlogItems() {
  try {
    const response = await fetch('json/blog.json'),
      data = await response.json(),
      loadItems = data.blog.slice(blogItemsLoaded, blogItemsLoaded + blogItemsAdd);
    loadItems.forEach(element => {
      const blogItem = `
<div class="blog__item">
<div class="blog__item-image">
  <img class="blog__item-img" src="images/blog/${element.image}" alt="собака">
  <div class="blog__item-date"><span>${element.date}</span>${element.month}</div>
</div>
<div class="blog__item-text">
  <h4 class="blog__item-title">${element.title}</h4>
  <p class="blog__item-desc">${element.text}</p>
  <a class="blog__item-link" href="#">Детальніше</a>
</div>
</div>
`;


      blogContainer.insertAdjacentHTML('beforeend', blogItem);
    });
    blogItemsLoaded += blogItemsAdd;
    if (blogItemsLoaded >= data.blog.length) {
      blogBtn.style.display = "none";
    }
  } catch (error) {
    console.error('Error loading blogItem:', error);
  }
}
