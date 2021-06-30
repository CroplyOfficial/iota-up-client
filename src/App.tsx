import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {Root} from "./pages/root/Root";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Root/>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
