import React from "react";
import Sidebar from "../components/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddProduct from "../components/AddProduct";
import ListProduct from "../components/ListProduct";
import OrdersProduct from "../components/OrdersProduct";

const Admin = () => {
  return (
    <div className="flex justify-beetwen">
      <Sidebar />

      <div>
        <Routes>
          <Route path="/add" element={<AddProduct />} />
          <Route path="/list" element={<ListProduct />} />
          <Route path="/orders" element={<OrdersProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
