import axios from 'axios';

const API_KEY = '66efe08f6cd439d8e930260ea254e96b';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovies = (query, page = 1) => {
  return api.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
};

export const getMovieDetails = (id) => {
  return api.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits',
    },
  });
};

export const getPopularMovies = (page = 1) => {
  return api.get('/movie/popular', {
    params: {
      page,
    },
  });
};

export const getRandomMovies = async (count = 5) => {
  try {
    const response = await getPopularMovies(1);
    const movies = response.data.results;
    const shuffled = movies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error('Erro ao buscar filmes aleatórios:', error);
    return [];
  }
};

export const getImageUrl = (path) => {
  return path ? `${IMAGE_BASE_URL}${path}` : null;
};

export default api;