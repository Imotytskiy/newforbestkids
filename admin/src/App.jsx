import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar"; // Переконайся, що файл існує
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Додай стилі для тостів
import Admin from "./pages/Admin";
import Login from "./components/Login";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  return (
    <div>
      {token === "" ? ( // Виправлено з "tokek"
        <Login setToken={setToken} />
      ) : (
        <>
          <ToastContainer autoClose={4000} />
          <Navbar setToken={setToken} />
          <Admin />
        </>
      )}
    </div>
  );
};

export default App;
