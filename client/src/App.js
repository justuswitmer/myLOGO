import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import "./stylesheets/App.scss";
import ComponentRoutes from "./components/Routes";
import Ctx from "./components/store/Ctx";
import { theme } from "./materialTheme";
import GlobalLoad from "./components/GlobalLoad";
import Header from "./components/Header";

const App = () => {
  return (
    <div id="App" className="App">
      <ThemeProvider theme={theme}>
        <Ctx>
          <Router>
            <GlobalLoad />
            <Header />
            <ComponentRoutes />
          </Router>
        </Ctx>
      </ThemeProvider>
    </div>
  );
};

export default App;
