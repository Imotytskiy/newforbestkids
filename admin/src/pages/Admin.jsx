import React from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Add from "../components/Add";
import List from "../components/List";
import Orders from "../components/Orders";

const Admin = () => {
  return (
    <div className="flex justify-beetwen">
      <Sidebar />

      <div>
        <Routes>
          <Route path="/add" element={<Add />} />
          <Route path="/list" element={<List />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
