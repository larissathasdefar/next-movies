import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: #212121;
`

export const Text = styled(Typography)`
  cursor: pointer;
`
