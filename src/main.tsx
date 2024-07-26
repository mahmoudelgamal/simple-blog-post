import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Blog from "./pages/Blog/Blog.tsx";
import { RootProvider } from "./providers/RootProvider/RootProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RootProvider>
      <Blog />
    </RootProvider>
  </React.StrictMode>
);
