import {
  GET_GENRES_REQUEST,
  GET_GENRES_SUCCESS,
  GET_GENRES_ERROR,
} from 'constants'
import { assoc, mergeDeepRight, reduce } from 'ramda'

const initial = {
  genres: {
    error: false,
    loading: false,
    items: {},
  },
}

const setLoading = objInfo => ({
  loading: true,
  error: false,
  ...objInfo,
})

const setSuccess = objInfo => ({
  loading: false,
  ...objInfo,
})

const setError = () => ({
  loading: false,
  erro: true,
})

const convertGenres = data => reduce(
  (acc, genre) => assoc(genre.id, genre.name, acc),
  {},
  data,
)

const currencies = (state = initial, action) => {
  switch (action.type) {
    case GET_GENRES_REQUEST:
      return mergeDeepRight(state, {
        genres: setLoading({ items: {} }),
      })
    case GET_GENRES_SUCCESS:
      return mergeDeepRight(state, {
        genres: setSuccess({ items: convertGenres(action.data.genres) }),
      })
    case GET_GENRES_ERROR:
      return mergeDeepRight(state, {
        genres: setError(),
      })
    default:
      return state
  }
}

export default currencies
