import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_maob73XQNST9k0E0qcYB5rumD7MyvNnpZXqqaHnME5AqsJSKmgk7yDm4Yo3HmZXZ';

const select = document.querySelector('.breed-select');
const info = document.querySelector('.cat-info');

function handlerBreedSearch() {
  fetchBreeds()
    .then(({ data }) => {
      select.innerHTML = createSelectMarkup(data);
    })
    .catch(err => console.log(err));
}

handlerBreedSearch();

function createSelectMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', handlerSelect);

function handlerSelect(evt) {
  fetchCatByBreed(evt.currentTarget.value)
    .then(({ data }) => (info.innerHTML = createMarkup(data)))
    .catch(err => console.log(err));
}

function createMarkup(arr) {
  return arr
    .map(
      ({ breeds, url }) => `
        <img src="${url}" alt="${breeds.map(item => item.name)}"/>
        <h2 class="name">${breeds.map(item => item.name)}</h2>
        <div class="description">${breeds.map(item => item.description)}</div>
        <div class="temperament"><span>Temperament: </span>${breeds.map(
          item => item.temperament
        )}</div>
    `
    )
    .join('');
}
