import React from 'react';
// import './App.css';
import {Editor} from './components/Editor/Editor';
import {List } from './components/List/List';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function App() {
  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Editor />
        </Grid>
        <Grid item xs={6}>
          <List  />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
