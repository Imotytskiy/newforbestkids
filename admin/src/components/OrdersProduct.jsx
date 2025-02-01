import React, { useEffect, useState } from "react";

const OrdersProduct = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch deliveries when the component mounts
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await fetch("http://localhost:4000/alldelivery");
        if (!response.ok) {
          throw new Error("Failed to fetch deliveries");
        }
        const data = await response.json();
        setDeliveries(data); // Store the fetched deliveries in state
      } catch (err) {
        setError(err.message); // Store any error in state
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchDeliveries();
  }, []);

  // Handle delete functionality
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (!confirmDelete) return; // Exit if deletion is not confirmed

    try {
      const response = await fetch("http://localhost:4000/removeorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        // Update deliveries state to remove the deleted order
        setDeliveries(deliveries.filter((delivery) => delivery._id !== id));
      } else {
        console.error("Failed to delete order:", result.message);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  // Show loading message
  if (loading) return <p>Loading...</p>;

  // Show error message if fetching failed
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1 className="">Orders</h1>
      <div className="">
        {deliveries.map((delivery) => (
          <div key={delivery._id} className="border p-4 mb-4">
            <h2>Order ID: {delivery._id}</h2>
            <p>
              Name: {delivery.name} {delivery.surname}
            </p>
            <p>Email: {delivery.email}</p>
            <p>
              Address: {delivery.address}, {delivery.city}, {delivery.country}
            </p>
            <p>Postal Code: {delivery.postalCode || "N/A"}</p>
            <p>Phone: {delivery.phone}</p>
            <p>Building: {delivery.building || "N/A"}</p>
            <p>Apartment: {delivery.appartment || "N/A"}</p>
            <p>Cart Items:</p>
            <ul>
              {JSON.parse(delivery.cartData).map((item, index) => (
                <li key={index}>
                  Product ID: {item._id}, Size: {item.size}, Quantity:{" "}
                  {item.quantity}
                </li>
              ))}
            </ul>
            {/* Delete button */}
            <p
              className="cursor-pointer text-red-600 font-bold"
              onClick={() => handleDelete(delivery._id)} // Correcting the reference to delivery._id
            >
              Delete Order
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersProduct;
