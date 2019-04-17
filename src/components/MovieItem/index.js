import React from 'react'
import _ from 'prop-types'
import { format } from 'date-fns'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

const Container = styled.div`
  padding: 10px 0px;
  cursor: pointer;
  transition: 1s;
  width: 342px;

  &:hover > div {
    opacity: 0.6;
  }
`

const Poster = styled.div`
  width: 342px;
  height: 513px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  transition: 1s;
  background-color: #ffffff52;
`

const Movie = ({ movie, genres, onClick }) => (
  <Container onClick={onClick}>
    <Poster
      src={`http://image.tmdb.org/t/p/w342${movie.poster_path || movie.backdrop_path}`}
      alt={`${movie.title} poster`}
    />
    <Typography variant="h6">
      {`${movie.title} (${format(movie.release_date, 'MM/DD/YYYY')})`}
    </Typography>
    <Typography>{movie.genre_ids.map(id => genres[id]).join(', ')}</Typography>
  </Container>
)

Movie.propTypes = {
  movie: _.shape({}).isRequired,
  genres: _.shape({}).isRequired,
  onClick: _.func.isRequired,
}

export default Movie
