import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AdminContextProvider from "./context/AdminContext";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminContextProvider>
      <App />
    </AdminContextProvider>
  </BrowserRouter>
);
