import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Root } from "./pages/root/Root";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/theme";
import { AboutUs } from "./pages/about_us/AboutUs";
import { Projects } from "./pages/projects/Projects";
import { Login } from "./pages/Login/Login";
import { Authorize } from "./pages/Authorize/Authorize";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact render={() => <Root />} />
            <Route path="/about" exact render={() => <AboutUs />} />
            <Route path="/projects" exact render={() => <Projects />} />
            <Route path="/login" exact render={() => <Login />} />
            <Route path="/authorize" exact render={() => <Authorize />}></Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
