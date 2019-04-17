import React, { PureComponent, Fragment } from 'react'
import _ from 'prop-types'
import { isEmpty } from 'ramda'
import { connect } from 'react-redux'
import { onLoadMovies, onSearchMovie } from 'actions/movies'
import { onLoadGenres } from 'actions/genres'
import styled from 'styled-components'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import MovieItem from 'components/MovieItem'
import Loading from 'components/Loading'
import LadderIcon from 'assets/ladder.png'

const Container = styled.div`
  padding: 10px;
  background-color: #212121;
  width: calc(100% - 20px);
  min-height: calc(100vh - 20px);
`

const MoviesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
`

const GoTop = styled(Typography)`
  && {
    cursor: pointer;
    margin: 40px 0px 20px 0px;
    transiction: 1s;
  }

  &:hover {
    opacity: 0.7;
  }
`

const Search = styled.div`
  position: absolute;
  right: 18px;
  top: 13px;
`

let timeout = null

class HomeContainer extends PureComponent {
  state = {
    searchMovie: '',
  }

  componentDidMount = () => {
    const { genres, onLoadMovies, onLoadGenres } = this.props
    if (isEmpty(genres.items)) {
      onLoadGenres()
    }
    onLoadMovies()
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll = () => {
    const { movies, onLoadMovies } = this.props

    const isAtBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 100)
    if (isAtBottom && !movies.loading && !movies.noMoreItems) {
      return onLoadMovies(movies.items.length / 20 + 1)
    }
    return null
  }

  handleGoTop = () => {
    document.body.scrollTop = 0 // For Safari
    document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
  }

  handleChange = event => {
    const { onSearchMovie } = this.props
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      onSearchMovie(this.state.searchMovie)
    }, 500)
    this.setState({ searchMovie: event.target.value })
  }

  handleClearSearch = () => {
    this.setState({ searchMovie: '' })
  }

  renderError = () => (
    <Fragment>
      <Typography variant="h4" align="center">
        An error ocurred.
      </Typography>
      <Typography variant="h5" align="center">
        Please, try again later.
      </Typography>
    </Fragment>
  )

  render() {
    const {
      movies, genres, history, search,
    } = this.props
    const { searchMovie } = this.state
    const items = isEmpty(searchMovie)
      ? movies.items
      : search.items
    return (
      <Container>
        <Typography gutterBottom variant="h4" align="center">
          Upcoming Movies
        </Typography>
        <Search>
          <TextField
            placeholder="Find a movie..."
            value={searchMovie}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={this.handleClearSearch}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={this.handleChange}
          />
        </Search>
        <MoviesContainer>
          {
            movies.error || genres.error || search.error
              ? this.renderError()
              : (
                <Fragment>
                  { items.map(movie => (
                    <MovieItem
                      key={movie.id}
                      movie={movie}
                      genres={genres.items}
                      onClick={() => history.push(`/movie/${movie.id}`)}
                    />
                  )) }
                  { (movies.loading || genres.loading || search.loading) && <Loading /> }
                  { (movies.noMoreItems || search.noMoreItems) && (
                    <GoTop
                      align="center"
                      variant="h6"
                      onClick={this.handleGoTop}>
                      {"You've reached the bottom of the pit. Please, use this ladder and return to the top."}
                      <img src={LadderIcon} alt="Ladder icon" />
                    </GoTop>
                  ) }
                </Fragment>
              )
          }
        </MoviesContainer>
      </Container>
    )
  }
}

HomeContainer.propTypes = {
  movies: _.shape({
    loading: _.bool.isRequired,
    error: _.bool.isRequired,
    items: _.arrayOf(
      _.shape({}),
    ),
    noMoreItems: _.bool.isRequired,
  }).isRequired,
  genres: _.shape({
    loading: _.bool.isRequired,
    error: _.bool.isRequired,
    items: _.shape({}),
  }).isRequired,
  search: _.shape({
    loading: _.bool.isRequired,
    error: _.bool.isRequired,
    items: _.arrayOf(
      _.shape({}),
    ),
    noMoreItems: _.bool.isRequired,
  }).isRequired,
  history: _.shape({
    push: _.func.isRequired,
  }).isRequired,
  onLoadMovies: _.func.isRequired,
  onLoadGenres: _.func.isRequired,
  onSearchMovie: _.func.isRequired,
}

const mapStateToProps = state => ({
  movies: state.movies.movies,
  search: state.movies.search,
  genres: state.genres.genres,
})

const mapDispatchToProps = {
  onLoadMovies,
  onLoadGenres,
  onSearchMovie,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeContainer)
