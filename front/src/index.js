import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { StripeProvider } from "react-stripe-elements";

ReactDOM.render(
  <StripeProvider apiKey="pk_test_qeGYvcFlvD1QxMkDbOhHENJ1">
    <App />
  </StripeProvider>,
  document.getElementById("root")
);
registerServiceWorker();
