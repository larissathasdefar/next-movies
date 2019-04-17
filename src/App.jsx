import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import Home from 'containers/HomeContainer'
import Movie from 'containers/MovieDetailContainer'
import NotFound from 'components/NotFound'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#f5f5f5',
    },
  },
})

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={props => <Home {...props} />} />
          <Route exact path="/movie/:id" component={props => <Movie {...props} />} />
          <Route exact path="*" component={props => <NotFound {...props} />} />
        </Switch>
      </Router>
    </Provider>
  </MuiThemeProvider>
)

ReactDom.render(<App />, document.getElementById('root'))
