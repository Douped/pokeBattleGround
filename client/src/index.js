import ReactDom from "react-dom";
import React from "react";

import App from "./App";

ReactDom.render(
  <React.StrictMode>
    <App className="flex-wrap" />
  </React.StrictMode>,
  document.getElementById("root")
);
