import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import App from './App.jsx'
import SwetroD from "./SwetroD";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <SwetroD />
  </StrictMode>,
);
