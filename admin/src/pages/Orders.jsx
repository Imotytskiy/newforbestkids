import React, { useEffect, useState } from "react";
import parcel_icon from "../assets/parcel_icon.png";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: newStatus },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Статус оновлено!");
        fetchAllOrders(); // ✅ Викликаємо оновлення списку замовлень після зміни статусу
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Помилка при оновленні статусу");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="text-xl font-semibold my-4">Order Page</h3>
      <div>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
              key={index}
            >
              <img
                className="w-12 h-12 sm:w-16 sm:h-16"
                src={parcel_icon}
                alt="Parcel Icon"
              />

              <div>
                {order.items.map((item, itemIndex) => (
                  <p className="py-0.5" key={itemIndex}>
                    {item.name} x {item.quantity} <span>({item.size})</span>
                    {itemIndex !== order.items.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>

              <p>{/* {order.address.firstname} {order.address.lastName} */}</p>

              <div>
                {/* <p>{order.address.street},</p> */}
                {/* <p>{order.address.city},</p> */}
                {/* <p>{order.address.country},</p> */}
                {/* <p>{order.address.zipcode}</p> */}
              </div>

              {/* <p>{order.address.phone}</p> */}

              <div>
                <p>Items: {order.items.length}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </div>

              <p className="text-sm sm:text-[15px]">
                {order.amount} <span className="font-semibold">{currency}</span>
              </p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
                className="border p-2 rounded font-semibold"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Замовлення відсутні.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
