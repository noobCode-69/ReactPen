import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { Buffer } from "buffer";
window.Buffer = Buffer;
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
