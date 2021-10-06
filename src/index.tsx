import React from "react";
import ReactDOM from "react-dom";
import MainApp from '@app/MainApp';
import { BrowserRouter } from "react-router-dom";

if (process.env.NODE_ENV !== "production") {
  const config = {
    rules: [
      {
        id: 'color-contrast',
        enabled: false
      }
    ]
  };
  // eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
  const axe = require("react-axe");
  axe(React, ReactDOM, 1000, config);
}

ReactDOM.render(<BrowserRouter><MainApp /></BrowserRouter>, document.getElementById("root") as HTMLElement);
