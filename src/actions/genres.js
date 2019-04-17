import {
  GET_GENRES_REQUEST,
  GET_GENRES_SUCCESS,
  GET_GENRES_ERROR,
} from 'constants'
import api from './service'

export const onLoadGenres = () => dispatch => {
  dispatch({ type: GET_GENRES_REQUEST })
  return fetch(`${api}/genres`)
    .then(response => response.json())
    .then(data => dispatch({ type: GET_GENRES_SUCCESS, data }))
    .catch(() => dispatch({ type: GET_GENRES_ERROR }))
}

export default onLoadGenres
