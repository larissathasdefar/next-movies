import React from 'react'
import _ from 'prop-types'
import { format } from 'date-fns'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import GoBackIcon from '@material-ui/icons/KeyboardArrowLeft'

const Container = styled.div`
  padding: 10px 0px;
  max-width: 1000px;
  margin: 0 auto;
`

const Poster = styled.div`
  width: 342px;
  height: 513px;
  margin: 0 auto;
  display: flex;
  margin-bottom: 10px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-position: center;
`

const PostList = styled.div`
  display: flex;
`

const MovieDetail = ({ movie, onGoBack }) => (
  <Container>
    <PostList>
      <Poster
        src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
        alt={`${movie.title} poster`}
      />
      <Poster
        src={`http://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
        alt={`${movie.title} poster`}
      />
    </PostList>
    <Typography variant="h4">
      {`${movie.title} (${format(movie.release_date, 'MM/DD/YYYY')})`}
    </Typography>
    <Typography paragraph>
      {movie.genres.map(({ name }) => name).join(', ')}
    </Typography>
    <Typography variant="body1" gutterBottom>{movie.overview}</Typography>
    <Button variant="contained" color="secondary" onClick={onGoBack}>
      <GoBackIcon />
      Go Back
    </Button>
  </Container>
)

MovieDetail.propTypes = {
  movie: _.shape({}).isRequired,
  onGoBack: _.func.isRequired,
}

export default MovieDetail
