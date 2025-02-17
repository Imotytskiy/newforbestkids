import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [error, setError] = useState(null);

  const loadOrderData = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );
      setOrderData(response.data);
      console.log("MONGO DATA", orderData);
    } catch (error) {
      console.error("Помилка завантаження замовлень:", error);
      setError("Не вдалося завантажити замовлення. Спробуйте ще раз.");
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="МОЇ" text2=" ЗАМОВЛЕННЯ" />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div>
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20"
                  src={item.image[0]}
                  alt={item.name}
                />
              </div>
              <p className="sm:text-base font-medium">{item.name}</p>
              <div className="flex items-center gap-3 mt-2 text-base text-gray-400">
                <p className="text-lg">
                  {item.price}
                  {currency}
                </p>
                <p>Quantity: {item.quantity}</p>
                <p>Size: {item.size}</p>
              </div>
              <p className="mt-2">
                Date: <span className="text-gray-400">{item.date}</span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Замовлення відсутні.</p>
        )}
      </div>
      <div className="md:w-1/2 flex justify-between">
        <div className="flex items-center gap-2">
          <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
          <p className="text-sm md:text-base">Підготовлено до відправлення</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
