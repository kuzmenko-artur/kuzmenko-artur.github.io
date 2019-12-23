let searchClears = document.querySelectorAll('.js-search-clear');
searchClears = Array.prototype.slice.call(searchClears); //Из DOM коллекция делаем массив

// Отчистка input по клику на крестик
searchClears.forEach(function(searchClear) {
  searchClear.addEventListener('click', function() {
    const searchText = searchClear.parentElement.querySelector('input[type="text"]');
    searchText.value = '';
    searchText.focus();
  })
});
