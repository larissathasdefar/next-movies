import {
  GET_GENRES_REQUEST,
  GET_GENRES_SUCCESS,
  GET_GENRES_ERROR,
} from 'constants'

const key = '1f54bd990f1cdfb230adb312546d765d'

export const onLoadGenres = () => dispatch => {
  dispatch({ type: GET_GENRES_REQUEST })
  return fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${key}`)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_GENRES_SUCCESS, data }))
    .catch(() => dispatch({ type: GET_GENRES_ERROR }))
}

export default onLoadGenres
