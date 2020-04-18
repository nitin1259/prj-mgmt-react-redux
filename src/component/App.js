import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from "./homePage/HomePage";
import AboutPage from "./aboutPage/AboutPage";
import Courses from "./courses/Courses";
import PageNotFound from "./common/PageNotFound";
import HeaderPage from "./common/HeaderPage";

function App() {
  return (
    <div className="container-fluid">
      <HeaderPage />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/courses" component={Courses} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
