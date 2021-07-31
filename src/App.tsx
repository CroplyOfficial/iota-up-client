import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Root } from "./pages/root/Root";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/theme";
import { AboutUs } from "./pages/about_us/AboutUs";
import { Projects } from "./pages/projects/Projects";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Login } from "./pages/Login/Login";
import { Authorize } from "./pages/Authorize/Authorize";
import { Settings } from "./pages/Settings/Settings";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Route path="/" exact render={() => <Root />} />
          <Route path="/about" exact render={() => <AboutUs />} />
          <Route path="/projects" exact render={() => <Projects />} />
          <Route path="/dashboard" render={() => <Dashboard />} />
          <Route path="/login" exact component={Login} />
          <Route path="/authorize" exact component={Authorize} />
          <Route path="/settings" exact component={Settings} />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
