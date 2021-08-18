import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import { Root } from "./pages/root/Root";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme/theme";
import { AboutUs } from "./pages/about_us/AboutUs";
import { ProjectOverview } from "./pages/project/Project";
import { Projects } from "./pages/projects/Projects";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Login } from "./pages/Login/Login";
import { Authorize } from "./pages/Authorize/Authorize";
import { Settings } from "./pages/Settings/Settings";
import { LoginModal } from "./components/loginModal/LoginModal";
import { Navbar } from "./components/navbar/Navbar";
import { Chat } from "./components/chat/Chat";

function App(props: any) {
  const [showingLoginModal, setShowingLoginModal] = useState<boolean>(false);
  const toggleShowingLoginModal = () =>
    setShowingLoginModal(!showingLoginModal);
  console.log(window.location.pathname, window.location.href, props);
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          {showingLoginModal ? (
            <LoginModal onClick={toggleShowingLoginModal} />
          ) : (
            <div></div>
          )}
          <Navbar toggleLoginModal={toggleShowingLoginModal} />
          <Chat />
          <Switch>
            <Route path="/" exact component={Root} />
            <Route path="/about" exact component={AboutUs} />
            <Route path="/projects" exact component={Projects} />
            <Route
              path="/project/:id"
              render={(props: any) => <ProjectOverview {...props} />}
            />
            <Route path="/dashboard" render={() => <Dashboard />} />
            <Route path="/login" exact component={Login} />
            <Route path="/authorize" exact component={Authorize} />
            <Route path="/settings" exact component={Settings} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
