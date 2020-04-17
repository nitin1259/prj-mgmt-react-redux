import React from "react";
import render from "react-dom";

function Hi() {
  return <h1>Hi there</h1>;
}

render(<Hi />, document.getElementById("app"));
