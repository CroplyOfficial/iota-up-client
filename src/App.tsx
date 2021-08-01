import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";

import { Root } from "./pages/root/Root";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/theme";
import { AboutUs } from "./pages/about_us/AboutUs";
import { Projects } from "./pages/projects/Projects";
import { Login } from "./pages/Login/Login";
import { Authorize } from "./pages/Authorize/Authorize";
import { Settings } from "./pages/Settings/Settings";
import { LoginModal } from "./components/loginModal/LoginModal";
import { Navbar } from "./components/navbar/Navbar";

function App() {
  const [showingLoginModal, setShowingLoginModal] = useState<boolean>(false);
  const toggleShowingLoginModal = () =>
    setShowingLoginModal(!showingLoginModal);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          {showingLoginModal ? (
            <LoginModal onClick={toggleShowingLoginModal} />
          ) : (
            <div></div>
          )}
          <Switch>
            <Route
              path="/"
              exact
              render={() => <Root toggleLoginModal={toggleShowingLoginModal} />}
            />
            <Route
              path="/about"
              exact
              render={() => (
                <AboutUs toggleLoginModal={toggleShowingLoginModal} />
              )}
            />
            <Route
              path="/projects"
              exact
              render={() => (
                <Projects toggleLoginModal={toggleShowingLoginModal} />
              )}
            />
            <Route
              path="/login"
              exact
              render={() => (
                <Login toggleLoginModal={toggleShowingLoginModal} />
              )}
            />
            <Route
              path="/authorize"
              exact
              render={() => (
                <Authorize toggleLoginModal={toggleShowingLoginModal} />
              )}
            />
            <Route
              path="/settings"
              exact
              render={() => (
                <Settings toggleLoginModal={toggleShowingLoginModal} />
              )}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
