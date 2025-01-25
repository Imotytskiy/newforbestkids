import React, { useState, useContext } from "react";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();
  const { cartData } = useContext(ShopContext);

  // const [deliveryInfo, setDeliveryInfo] = useState({
  //   name: "",
  //   surname: "",
  //   email: "",
  //   address: "",
  //   city: "",
  //   country: "",
  //   postalCode: "",
  //   phone: "",
  //   building: "",
  //   appartment: "",
  //   cartData: JSON.stringify(cartData), // Include cartData as a JSON string
  // });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setDeliveryInfo((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const [loading, setLoading] = useState(false);

  // const handleSubmit = async () => {
  //   setLoading(true);

  //   try {
  //     const response = await fetch("http://localhost:4000/delivery", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ ...deliveryInfo, method }), // Ensure deliveryInfo and method are correctly included
  //     });

  //     if (response.ok) {
  //       // Navigate to orders page
  //       navigate("/place-order");
  //     } else {
  //       const errorResponse = await response.json();
  //       console.error("Failed to place order:", errorResponse);
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh]">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl1 sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"}></Title>
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Ім`я"
            name="name"
            value={deliveryInfo.name}
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Прізвище"
            name="surname"
            value={deliveryInfo.surname}
            onChange={handleInputChange}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email адреса"
          name="email"
          value={deliveryInfo.email}
          onChange={handleInputChange}
        />
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Адреса"
          name="address"
          value={deliveryInfo.address}
          onChange={handleInputChange}
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Місто"
            name="city"
            value={deliveryInfo.city}
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Країна"
            name="country"
            value={deliveryInfo.country}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Building"
            name="building"
            value={deliveryInfo.building}
            onChange={handleInputChange}
          />
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Apartment"
            name="appartment"
            value={deliveryInfo.appartment}
            onChange={handleInputChange}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
          name="phone"
          value={deliveryInfo.phone}
          onChange={handleInputChange}
        />
      </div>

      {/* Right side */}
      <div className="mt-8">
        <div className="my-8 min-v-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
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
            <img className="h-5 mx-4" src={assets.mastercard_logo} alt="" />
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
            onClick={() => navigate("/orders")}
            className="bg-black text-white px-16 py-3 text-sm"
          >
            {/* {loading ? "Processing..." : "ЗАМОВИТИ"} */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
