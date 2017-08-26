import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import { Switch, BrowserRouter, Route, browserHistory} from 'react-router-dom';

import Index from './components/index.js'

export default class App extends Component {

  render() {
    return (
      <Provider store={ createStore(reducers) }>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Index} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}
