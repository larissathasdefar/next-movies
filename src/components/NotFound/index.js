import React from 'react'
import _ from 'prop-types'
import { Container, Text } from './NotFound.styles'

const NotFound = ({ history }) => {
  const redirect = () => history.push('/')
  return (
    <Container>
      <Text variant="h3" onClick={redirect}>Not Found</Text>
      <Text onClick={redirect}>Click here and go back to home</Text>
    </Container>
  )
}

NotFound.propTypes = {
  history: _.shape({
    push: _.func,
  }).isRequired,
}

export default NotFound
