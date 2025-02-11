import React, { useState, useContext } from "react";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    country: "",
    building: "",
    appartment: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData, // виправлено "adress" -> "address"
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };

      switch (method) {
        case "cod":
          const response = await axios.post(
            backendUrl + "/api/order/place",
            orderData,
            { headers: { token } }
          );
          console.log(response.data); // Переміщено після визначення response
          if (response.data.success) {
            setCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        default:
          toast.error("Невідомий метод оплати");
          break;
      }
    } catch (error) {
      console.error("Помилка під час обробки замовлення:", error);
      toast.error("Не вдалося оформити замовлення. Спробуйте ще раз!");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl1 sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Ім`я"
            name="firstname"
            value={formData.firstname}
            onChange={onChangeHandler}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Прізвище"
            name="lastname"
            value={formData.lastname}
            onChange={onChangeHandler}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email адреса"
          name="email"
          value={formData.email}
          onChange={onChangeHandler}
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Адреса"
          name="address"
          value={formData.address}
          onChange={onChangeHandler}
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Місто"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Країна"
            name="country"
            value={formData.country}
            onChange={onChangeHandler}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Телефон"
          name="phone"
          value={formData.phone}
          onChange={onChangeHandler}
        />
      </div>

      <div className="mt-8">
        <div className="my-8 min-v-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1="PAYMENT" text2="METHOD" />
          <div className="flex gap-3 flex-col lg:flex-row"></div>
          <div
            onClick={() => setMethod("mastercard")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "mastercard" ? "bg-green-400" : ""
              }`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              CARD PAYMENT
            </p>
            <img
              className="h-5 mx-4"
              src={assets.mastercard_logo}
              alt="MasterCard"
            />
          </div>
          <div
            onClick={() => setMethod("cod")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <p
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "cod" ? "bg-green-400" : ""
              }`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              CASH ON DELIVERY
            </p>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            type="submit"
            className="bg-black text-white px-16 py-3 text-sm"
          >
            ОФОРМИТИ ЗАМОВЛЕННЯ
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
