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
import api from './service'

export const onLoadMovies = (page = '1') => dispatch => {
  dispatch({ type: GET_MOVIES_REQUEST })
  return fetch(`${api}/upcoming/page/${page}`)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_MOVIES_SUCCESS, data }))
    .catch(() => dispatch({ type: GET_MOVIES_ERROR }))
}

export const onLoadMovie = movie => dispatch => {
  dispatch({ type: GET_MOVIE_REQUEST })
  return fetch(`${api}/movie/${movie}`)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_MOVIE_SUCCESS, data }))
    .catch(() => dispatch({ type: GET_MOVIE_ERROR }))
}

export const onSearchMovie = (movie, page = '1') => dispatch => {
  dispatch({ type: SEARCH_MOVIE_REQUEST })
  return fetch(`${api}/search/${movie}/page/${page}`)
    .then(response => response.json())
    .then(data => dispatch({ type: SEARCH_MOVIE_SUCCESS, data }))
    .catch(() => dispatch({ type: SEARCH_MOVIE_ERROR }))
}
