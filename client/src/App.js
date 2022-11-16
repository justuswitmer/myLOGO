import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./stylesheets/App.scss";
import ComponentRoutes from "./components/Routes";
import Ctx from "./components/store/Ctx";
import Header from "./components/Header";

const App = () => {
  return (
    <div id="App" className="App">
        <Ctx>
          <Router>
            <Header />
            <ComponentRoutes />
          </Router>
        </Ctx>
    </div>
  );
};

export default App;
