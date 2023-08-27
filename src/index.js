import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_maob73XQNST9k0E0qcYB5rumD7MyvNnpZXqqaHnME5AqsJSKmgk7yDm4Yo3HmZXZ';

const breed = document.querySelector('.breed-select');

function handlerBreedSearch() {
  fetchBreeds()
    .then(({ data }) => console.log(data))
    .catch(err => console.log(err));
}

function fetchBreeds() {
  const BASE_URL = 'https://api.thecatapi.com/v1';
  const END_POINT = '/breeds';

  return axios.get(`${BASE_URL}${END_POINT}`).then(response => {
    return response;
  });
}

handlerBreedSearch();
