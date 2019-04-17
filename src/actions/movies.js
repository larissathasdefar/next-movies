import {
  GET_MOVIES_REQUEST,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_ERROR,
  GET_MOVIE_REQUEST,
  GET_MOVIE_SUCCESS,
  GET_MOVIE_ERROR,
  SEARCH_MOVIE_REQUEST,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_ERROR,
} from 'constants'

const key = '1f54bd990f1cdfb230adb312546d765d'

export const onLoadMovies = (page = '1') => dispatch => {
  dispatch({ type: GET_MOVIES_REQUEST })
  return fetch(`https://api.themoviedb.org/3/movie/upcoming?page=${page}&language=en-US&api_key=${key}`)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_MOVIES_SUCCESS, data }))
    .catch(() => dispatch({ type: GET_MOVIES_ERROR }))
}

export const onLoadMovie = movie => dispatch => {
  dispatch({ type: GET_MOVIE_REQUEST })
  return fetch(`https://api.themoviedb.org/3/movie/${movie}?language=en-US&api_key=${key}`)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_MOVIE_SUCCESS, data }))
    .catch(() => dispatch({ type: GET_MOVIE_ERROR }))
}

export const onSearchMovie = (query, page = '1') => dispatch => {
  dispatch({ type: SEARCH_MOVIE_REQUEST })
  return fetch(`https://api.themoviedb.org/3/search/movie?include_adult=false&page=${page}&query=${query}&language=en-US&api_key=${key}`)
    .then(response => response.json())
    .then(data => dispatch({ type: SEARCH_MOVIE_SUCCESS, data }))
    .catch(() => dispatch({ type: SEARCH_MOVIE_ERROR }))
}
