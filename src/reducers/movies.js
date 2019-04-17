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
import { concat, mergeDeepRight } from 'ramda'

const initial = {
  movies: {
    error: false,
    loading: false,
    items: [],
    noMoreItems: false,
  },
  movie: {
    error: false,
    loading: false,
    info: {},
  },
  search: {
    error: false,
    loading: false,
    items: [],
    noMoreItems: false,
  },
}

const setLoading = (objInfo = {}) => ({
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

const currencies = (state = initial, action) => {
  switch (action.type) {
    case GET_MOVIES_REQUEST:
      return mergeDeepRight(state, {
        movies: setLoading(),
      })
    case GET_MOVIES_SUCCESS:
      return mergeDeepRight(state, {
        movies: setSuccess({
          items: action.data.page === 1
            ? action.data.results
            : concat(state.movies.items, action.data.results),
          noMoreItems: action.data.total_pages === action.data.page,
        }),
      })
    case GET_MOVIES_ERROR:
      return mergeDeepRight(state, {
        movies: setError(),
      })
    case GET_MOVIE_REQUEST:
      return mergeDeepRight(state, {
        movie: setLoading({ info: {} }),
      })
    case GET_MOVIE_SUCCESS:
      return mergeDeepRight(state, {
        movie: setSuccess({ info: action.data }),
      })
    case GET_MOVIE_ERROR:
      return mergeDeepRight(state, {
        movie: setError(),
      })
    case SEARCH_MOVIE_REQUEST:
      return mergeDeepRight(state, {
        search: setLoading(),
      })
    case SEARCH_MOVIE_SUCCESS:
      return mergeDeepRight(state, {
        search: setSuccess({
          items: action.data.page === 1
            ? action.data.results
            : concat(state.movies.items, action.data.results),
          noMoreItems: action.data.total_pages === action.data.page,
        }),
      })
    case SEARCH_MOVIE_ERROR:
      return mergeDeepRight(state, {
        search: setError(),
      })
    default:
      return state
  }
}

export default currencies
