import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import CryptoProvider from "./context/CryptoContext";
import FavoriteProvider from "./context/FavoriteContext";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <FavoriteProvider>
      <CryptoProvider>
        <App />
      </CryptoProvider>
    </FavoriteProvider>
  </BrowserRouter>
);
