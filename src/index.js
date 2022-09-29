import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { Provider } from "react-redux";
import store from "./app/store";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Poppins",
    },
    button: {
      fontFamily: "Poppins",
      fontSize: "1.6rem",
      textTransform: "none",
    },
    fontSize: "1.6rem",
  },
});

root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
);
