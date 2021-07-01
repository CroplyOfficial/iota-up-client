import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {Root} from "./pages/root/Root";
import {ThemeProvider} from '@material-ui/core';
import {theme} from './theme/theme';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <Root/>} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
