import React, { useEffect, useState } from "react";

const List = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data.data); // Access the data array
        console.log(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:4000/removeproduct", {
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
        // Update the state to remove the deleted product
        setAllProducts(allProducts.filter((product) => product._id !== id));
      } else {
        console.error("Failed to delete product:", result.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return (
    <div className="w-full mx-auto my-8 text-gray-600 text-base">
      <h1 className="mb-2 text-center">All Products List</h1>
      <div className="flex flex-col gap-2">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="">ВИДАЛИТИ</b>
        </div>

        {/* Product Rows */}
        <hr />
        {allProducts.map((product, index) => {
          // Ensure images is defined and an array before accessing [0]
          const imageSrc =
            Array.isArray(product.images) && product.images.length > 0
              ? product.images[0]
              : "default-image-url.jpg";
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] md:grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            >
              <img className="w-12" src={imageSrc} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.category}</p>

              <p>{product.price}</p>
              <p
                className="cursor-pointer text-red-600 hover:text-red-800 bg-gray-200 rounded-full px-3 py-1 transition-all duration-300 ease-in-out transform hover:scale-105"
                onClick={() => handleDelete(product._id)} // Add click handler
              >
                DELETE
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
