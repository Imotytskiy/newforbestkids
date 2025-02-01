import React from "react";
import { Link } from "react-router-dom";
import add_product_icon from "../assets/add_product_icon.png";
import list_items_icon from "../assets/list_items_icon.png";
import orders_icon from "../assets/orders_icon.png";

const Sidebar = () => {
  return (
    <div className="flex justify-start">
      <div className="w-full x min-h-screen border-r-2">
        <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
          <Link
            to="/add"
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <img className="w-5 h-5" src={add_product_icon} alt="Add Icon" />
            <p className="">Add Items</p>
          </Link>
          <Link
            to="/list"
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <img className="w-5 h-5" src={list_items_icon} alt="List Icon" />
            <p className="">List Items</p>
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          >
            <img className="w-5 h-5" src={orders_icon} alt="Orders Icon" />
            <p className="">Orders</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
