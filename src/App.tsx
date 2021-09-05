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
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Privacy } from "./pages/Privacy/Privacy";
import { Terms } from "./pages/Terms/Terms";

function App(props: any) {
  const [showingLoginModal, setShowingLoginModal] = useState<boolean>(false);
  const toggleShowingLoginModal = () =>
    setShowingLoginModal(!showingLoginModal);
  console.log(window.location.pathname, window.location.href, props);
  const userInfoMeta = useSelector((state: RootState) => state.userLogin);
  const { userInfo }: any = userInfoMeta;

  // Chat
  const [showMessages, setShowMessages] = useState<boolean>(false);
  const [showList, setShowList] = useState<boolean>(true);
  const [chatId, setChatId] = useState<string>("");

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          {showingLoginModal ? (
            <LoginModal onClick={toggleShowingLoginModal} />
          ) : (
            <div></div>
          )}
          <Navbar
            toggleLoginModal={toggleShowingLoginModal}
            showMessages={showMessages}
            setShowMessages={setShowMessages}
            showList={showList}
            setChatId={setChatId}
            setShowList={setShowList}
          />
          {userInfo && (
            <Chat
              showMessages={showMessages}
              setShowMessages={setShowMessages}
              showList={showList}
              setShowList={setShowList}
              chatId={chatId}
              setChatId={setChatId}
            />
          )}
          <Switch>
            <Route path="/" exact component={Root} />
            <Route path="/about" exact component={AboutUs} />
            <Route path="/projects" exact component={Projects} />
            <Route
              path="/project/:id"
              render={(props: any) => (
                <ProjectOverview
                  {...props}
                  setShowMessages={setShowMessages}
                  setShowList={setShowList}
                  setChatId={setChatId}
                />
              )}
            />
            <Route path="/dashboard" render={() => <Dashboard />} />
            <Route path="/login" exact component={Login} />
            <Route path="/authorize" exact component={Authorize} />
            <Route path="/settings" exact component={Settings} />
            <Route path="/privacy" exact component={Privacy} />
            <Route path="/terms" exact component={Terms} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
