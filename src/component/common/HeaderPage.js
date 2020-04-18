import React from "react";
import { Link } from "react-router-dom";
import HomePage from "../homePage/HomePage";
import Courses from "../courses/Courses";
import AboutPage from "../aboutPage/AboutPage";

function HeaderPage() {
  return (
    <nav>
      <Link to="/" component={HomePage}>
        Home
      </Link>{" "}
      |
      <Link to="/courses" component={Courses}>
        Courses
      </Link>{" "}
      |
      <Link to="/about" component={AboutPage}>
        About
      </Link>
    </nav>
  );
}

export default HeaderPage;
