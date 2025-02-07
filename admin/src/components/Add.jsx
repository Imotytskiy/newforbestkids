import React, { useState } from "react";
import upload_area from "../assets/upload_area.png";
import { backendUrl } from "../App";

const Add = () => {
  const [image, setImage] = useState(null);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    price: "100",
    category: "",
    subCategory: "",
    bestseller: false,
  });

  const handleSizeClick = (size) => {
    setSelectedSizes(
      (prevSizes) =>
        prevSizes.includes(size)
          ? prevSizes.filter((s) => s !== size) // Remove size if already selected
          : [...prevSizes, size] // Add size if not already selected
    );
  };

  const resetForm = () => {
    setProductDetails({
      name: "",
      description: "",
      price: "",
      category: "Men",
      subCategory: "",
      bestseller: false,
    });
    setSelectedSizes([]);
    setImage(null);
  };

  const Add_Product = async () => {
    let responseData;
    const formData = new FormData();
    formData.append("product", image); // Ensure this name matches your multer field

    // Append product details to formData
    formData.append("name", productDetails.name);
    formData.append("price", productDetails.price);
    formData.append("category", productDetails.category);
    formData.append("description", productDetails.description);
    formData.append("sizes", JSON.stringify(selectedSizes)); // Convert sizes array to JSON string
    formData.append("bestseller", productDetails.bestseller);

    try {
      const response = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        responseData = await response.json();
      } else {
        console.error("Server error:", response.statusText);
        return;
      }

      if (responseData.success) {
        const updatedProduct = {
          ...productDetails,
          image: [responseData.image_url],
          sizes: selectedSizes, // Include sizes in the product data
        };

        // Send the product data to the backend
        const productResponse = await fetch(
          "http://localhost:4000/addproduct",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
          }
        );

        const productData = await productResponse.json();

        if (productData.success) {
          console.log("Product added successfully:", productData.product);
          alert("Product added successfully!");

          // Reset the form after successful submission
          resetForm();
        } else {
          console.error("Failed to add product:", productData.message);
          alert("Failed to add product:", productData.message);
        }
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  return (
    <div className="bd-gray-50 min-h-screen">
      <div className="w-full">
        <p className="mb-2">Назва речі</p>
        <input
          className="w-full max-w-[500px] px-3 py-2 border-2"
          value={productDetails.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Description</p>
        <textarea
          className="w-full max-w-[600px] px-3 py-2 border-2"
          value={productDetails.description}
          onChange={changeHandler}
          name="description"
          placeholder="Write content"
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="px-3 py-2 border-2"
        >
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
          <option value="kids">Kids</option>
        </select>
      </div>

      <div className="w-full">
        <p className="mb-2">Sub category</p>
        <select
          className="w-full px-3 py-2 border-2"
          value={productDetails.subCategory}
          onChange={changeHandler}
          name="subCategory"
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      <div className="w-full">
        <p className="mb-2">Product price</p>
        <input
          className="w-full px-3 py-2 border-2"
          value={productDetails.price}
          onChange={changeHandler}
          type="number"
          name="price"
          placeholder="Type here"
          min="0" // Ensures only positive numbers are allowed
          step="0.01" // Allows input for decimals (e.g., 19.99)
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {["50", "56", "62", "68", "74", "80", "86", "92"].map((size) => (
            <div key={size}>
              <p
                onClick={() => handleSizeClick(size)}
                className={`bg-slate-200 px-3 py-1 cursor-pointer ${
                  selectedSizes.includes(size) ? "bg-blue-500 text-white" : ""
                }`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={productDetails.bestseller}
          onChange={() =>
            setProductDetails((prev) => ({
              ...prev,
              bestseller: !prev.bestseller,
            }))
          }
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <div className="flex flex-row gap-2">
        <div className="flex gap-2 mt-4">
          <label htmlFor="file-input">
            <img
              className="w-40 h-40"
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="Upload Area"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
        <div className="flex gap-2 mt-4">
          <label htmlFor="file-input">
            <img
              className="w-40 h-40"
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="Upload Area"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
        <div className="flex gap-2 mt-4">
          <label htmlFor="file-input">
            <img
              className="w-40 h-40"
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="Upload Area"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
        <div className="flex gap-2 mt-4">
          <label htmlFor="file-input">
            <img
              className="w-40 h-40"
              src={image ? URL.createObjectURL(image) : upload_area}
              alt="Upload Area"
            />
          </label>
          <input
            onChange={imageHandler}
            type="file"
            name="image"
            id="file-input"
            hidden
          />
        </div>
      </div>

      <button
        onClick={Add_Product}
        className="w-28 py-3 mt-4 bg-black text-white "
      >
        ADD
      </button>
    </div>
  );
};

export default Add;
