import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import logService from "./services/logService";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

logService.init();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
