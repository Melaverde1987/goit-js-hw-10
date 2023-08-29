import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_maob73XQNST9k0E0qcYB5rumD7MyvNnpZXqqaHnME5AqsJSKmgk7yDm4Yo3HmZXZ';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const info = document.querySelector('.cat-info');

function handlerBreedSearch() {
  fetchBreeds()
    .then(({ data }) => {
      select.innerHTML = createSelectMarkup(data);
      select.classList.remove('hidden');
      new SlimSelect({
        select: select,
        settings: {
          showSearch: false,
        },
      });
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
}

handlerBreedSearch();

function createSelectMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', handlerSelect);

function handlerSelect(evt) {
  loader.classList.remove('hidden');

  fetchCatByBreed(evt.currentTarget.value)
    .then(({ data }) => {
      Notify.success('Meow!');
      info.innerHTML = createMarkup(data);
    })
    .catch(err => {
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => {
      loader.classList.add('hidden');
    });
}

function createMarkup(arr) {
  return arr
    .map(
      ({ breeds, url }) => `
        <img src="${url}" class="image" alt="${breeds.map(item => item.name)}"/>
        <div class="text">
          <h2 class="name">${breeds.map(item => item.name)}</h2>
          <div class="temperament"><span>Temperament: </span>${breeds.map(
            item => item.temperament
          )}</div>
          <div class="description">${breeds.map(item => item.description)}</div>
        </div>
    `
    )
    .join('');
}
