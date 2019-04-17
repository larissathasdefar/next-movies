import React, { Component, Fragment } from 'react'
import _ from 'prop-types'
import { cond, isEmpty, T } from 'ramda'
import { connect } from 'react-redux'
import { onLoadMovie } from 'actions/movies'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import MovieDetail from 'components/MovieDetail'
import Loading from 'components/Loading'

const Container = styled.div`
  padding: 10px;
  background-color: #212121;
  width: calc(100% - 20px);
  height: calc(100vh - 20px);
  min-height: fit-content;
`

class MovieDetailContainer extends Component {
  componentDidMount = () => {
    const { match, onLoadMovie } = this.props
    onLoadMovie(match.params.id)
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
    const { movie, history } = this.props
    return (
      <Container>
        {
          cond([
            [() => movie.error, this.renderError],
            [() => movie.loading || isEmpty(movie.info), () => <Loading />],
            [T, () => (
              <MovieDetail
                key={movie.info.id}
                movie={movie.info}
                onGoBack={() => history.push('/')}
              />
            )],
          ])()
        }
      </Container>
    )
  }
}

MovieDetailContainer.propTypes = {
  movie: _.shape({
    loading: _.bool.isRequired,
    error: _.bool.isRequired,
    info: _.shape({}),
  }).isRequired,
  history: _.shape({
    push: _.func.isRequired,
  }).isRequired,
  match: _.shape({}).isRequired,
  onLoadMovie: _.func.isRequired,
}

const mapStateToProps = state => ({
  movie: state.movies.movie,
})

const mapDispatchToProps = {
  onLoadMovie,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MovieDetailContainer)
