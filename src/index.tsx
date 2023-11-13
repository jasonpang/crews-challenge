import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import App from "./components/App";
import { MantineProvider, createTheme } from "@mantine/core";
import "./data";
import "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <MantineProvider theme={createTheme({})}>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
