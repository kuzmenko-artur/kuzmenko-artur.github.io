const header = document.querySelector('.js-header'),
      headerSearchItem =               header.querySelector('.header__item-search'),
      headerLogoItem =                 header.querySelector('.header__item-logo'),
      headerSearch =                   header.querySelector('.search'),
      searchSubmit =                   header.querySelector('.js-search-submit'),
      cartInformet =                   header.querySelector('.js-cart-informer'),
      headerBasket =                   header.querySelector('.header__basket'),
      basket =                         header.querySelector('.basket'),

      resizeSearch = () =>             headerSearch.style.width = (headerSearchWidth + headerLogoWidth) + 'px',
      resizeBasketWidth = () =>        headerBasket.style.width = headerWidth + 'px',
      resizeBasketHeight = (height) => headerBasket.style.height = height + 'px';

let   headerWidth =                    header.offsetWidth,
      headerSearchWidth =              headerSearchItem.offsetWidth,
      headerLogoWidth =                headerLogoItem.offsetWidth,
      basketHeight =                   basket.offsetHeight;

// Открываем строку поиска в шапке
function showSearchBar() {
  event.preventDefault();
  searchSubmit.removeEventListener('click', showSearchBar);
  header.classList.contains('header--basket-open') ? hideBasket() : false;
  resizeSearch();
  header.classList.toggle('header--search-open');
  setTimeout(() => searchSubmit.parentElement.querySelector('input[type="text"]').focus(), 100);

  setTimeout(() => document.addEventListener('click', hideSearchBar), 100);
}
// Скрываем строку поиска в шапке
function hideSearchBar() {
  let headerSearchDescendants  = headerSearch.querySelectorAll('*');
  headerSearchDescendants = Array.prototype.slice.call(headerSearchDescendants); //Из DOM коллекция делаем массив

  if ( event.target !== headerSearch && !headerSearchDescendants.some(item => event.target === item) ) {
    headerSearch.removeAttribute('style');
    header.classList.toggle('header--search-open');
    document.removeEventListener('click', hideSearchBar);
    searchSubmit.addEventListener('click', showSearchBar);
  }
}
searchSubmit.addEventListener('click', showSearchBar);

// Открываем корзину в шапке
resizeBasketWidth();
function showBasket() {
  cartInformet.removeEventListener('click', showBasket);
  resizeBasketWidth();
  header.classList.toggle('header--basket-open');
  resizeBasketHeight(basketHeight);

  cartInformet.addEventListener('click', hideBasket);
}
// Закрываем корзину в шапке
function hideBasket() {
  cartInformet.removeEventListener('click', hideBasket);
  resizeBasketHeight(0);
  header.classList.toggle('header--basket-open');

  cartInformet.addEventListener('click', showBasket);
}
cartInformet.addEventListener('click', showBasket);

function resize() {
  // Ресайзим строку поиска
  headerSearchWidth = headerSearchItem.offsetWidth,
  headerLogoWidth =   headerLogoItem.offsetWidth;
  if (header.classList.contains("header--search-open")) {
    resizeSearch();
  }

  // Ресайзим корзину
  headerWidth =  header.offsetWidth;
  basketHeight = basket.offsetHeight;
  if (header.classList.contains("header--basket-open")) {
    resizeBasketWidth();
    resizeBasketHeight(basketHeight);
  }
}

window.addEventListener('resize', resize);
