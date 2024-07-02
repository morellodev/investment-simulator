import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./index.css";

const mountElement = document.getElementById("root");

if (!mountElement) {
  throw new Error("Root element not found");
}

createRoot(mountElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
