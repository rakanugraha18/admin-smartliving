import React, { useState } from "react";
import FirebaseImageUpload from "../../../Firebase/FirebaseImageUpload";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [displayImage, setDisplayImage] = useState(null);
  const [images, setImages] = useState([null, null, null, null]);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Display Image</label>
          <FirebaseImageUpload />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Other Images</label>
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <input
                key={index}
                type="file"
                onChange={(e) => handleImageChange(index, e.target.files[0])}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              />
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <div className="flex items-center mt-1">
            <button
              type="button"
              onClick={() => setStock(stock > 0 ? stock - 1 : 0)}
              className="px-2 py-1 bg-red-500 text-white rounded-md"
            >
              -
            </button>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="mx-2 p-2 border border-gray-300 rounded-md w-16 text-center"
            />
            <button
              type="button"
              onClick={() => setStock(stock + 1)}
              className="px-2 py-1 bg-green-500 text-white rounded-md"
            >
              +
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Color</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Discount</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
