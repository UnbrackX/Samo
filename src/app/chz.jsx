import React from "react";
import ReactDOM from "react-dom/client";
import App from "./chz/App";
import { Provider } from "react-redux";
import store from "./chz/store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
