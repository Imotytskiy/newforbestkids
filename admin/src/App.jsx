import React, { useState } from "react";
import Navbar from "./components/Navbar"; // Переконайся, що файл існує
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Додай стилі для тостів
import Admin from "./pages/Admin";
import Login from "./components/Login";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState("");

  return (
    <div>
      {token === "" ? ( // Виправлено з "tokek"
        <Login />
      ) : (
        <>
          <ToastContainer autoClose={4000} />
          <Navbar />
          <Admin />
        </>
      )}
    </div>
  );
};

export default App;
