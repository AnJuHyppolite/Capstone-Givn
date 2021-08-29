// import axios from "axios";
// import { useState, useEffect } from "react";
// import { apiURL } from "./util/apiURL.js";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Index from "./Pages/Index";
import New from "./Pages/New";
import Show from "./Pages/Show";
// const API = apiURL();

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/signup">
            {/*signup  */}
          </Route>
          <Route exact path="/posts">
            <Index />
          </Route>
          <Route exact path="/posts/new">
            <New />
          </Route>
          <Route exact path="/posts/:id">
            <Show/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
