import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SwetroD from "./SwetroD";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SwetroD />
  </StrictMode>,
);
