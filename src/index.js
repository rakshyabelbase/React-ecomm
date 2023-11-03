import React from "react";
import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";

import "antd/dist/reset.css";
const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
    <React.StrictMode>
    <AuthProvider>
      <SearchProvider>
      <App />
      </SearchProvider>
    </AuthProvider>
  </React.StrictMode>,
);
