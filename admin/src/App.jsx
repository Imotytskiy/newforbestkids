import React from "react";
import Navbar from "./components/Navbar"; // Ensure this matches the file name
import { ToastContainer } from "react-toastify";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <div>
      <ToastContainer autoClose={4000} />
      <Navbar />
      <Admin />
    </div>
  );
};

export default App;
