import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import New from "./Pages/New";
import Show from "./Pages/Show";
import EditForm from "./Pages/Edit";
import NavBar from "./Components/NavBar";
import UserProvider from "./Providers/UserProvider";
import Profile from "./Pages/Profile";
import SignUp from "./Pages/SignUp";
import FourOFour from "./Pages/FourOFour";
import AboutPage from "./Pages/AboutPage";
import EditProfile from "./Components/EditProfile";


function App() {
  return (
    <div>
      <UserProvider>
        <Router>
          <NavBar />
          <main className="App">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/login">
                <Home />
              </Route>
              <Route exact path="/signup">
                <SignUp />
              </Route>
              <Route exact path="/posts">
                <Index />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/profile/edit">
                <EditProfile />
              </Route>
              <Route exact path="/about">
                <AboutPage />
              </Route>
              <Route exact path="/posts/new">
                <New />
              </Route>
              <Route exact path="/posts/:id">
                <Show />
              </Route>
              <Route exact path="/posts/:id/edit">
                <EditForm />
              </Route>
              <Route path="*">
                <FourOFour />
              </Route>
            </Switch>
          </main>
        </Router>
      </UserProvider>
    </div>
  );
}

export default App;
