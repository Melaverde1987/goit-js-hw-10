import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';

const fetchBreeds = () => {
  const END_POINT = '/breeds';

  return axios.get(`${BASE_URL}${END_POINT}`).then(response => {
    return response;
  });
};

const fetchCatByBreed = breedId => {
  const END_POINT = '/images/search';

  const params = new URLSearchParams({
    breed_ids: breedId,
  });

  return axios.get(`${BASE_URL}${END_POINT}?${params}`).then(response => {
    return response;
  });
};

export { fetchBreeds, fetchCatByBreed };
