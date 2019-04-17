import styled from 'styled-components'
import CircularProgress from '@material-ui/core/CircularProgress'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ fullHeight }) => (fullHeight ? 'calc(100vh - 78px)' : '90px')};
  width: 100%;
`

export const Icon = styled(CircularProgress)`
  && {
    color: #FFFFFF;
  }
`

export default Container
