import React, { Component } from 'react'
import { Provider } from 'react-redux'
import Grid from '@material-ui/core/Grid';
import store from './store'
// Pages
import List from './pages/List'
import Editor from './pages/Editor'

// Assets & Style
import './App.css'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Editor />
              </Grid>
              <Grid item xs={6}>
                <List />
              </Grid>
            </Grid>
      </Provider>
    );
  }
}

export default App;
