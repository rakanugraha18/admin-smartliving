import React, { useState } from "react";
import DashboardLayout from "../components/organism/DashboardLayout";
import FirebaseImageUpload from "../Firebase/FirebaseImageUpload";
import ImageProduct from "../Firebase/ImageProduct";
import axios from "axios";

function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [displayImage, setDisplayImage] = useState(null);
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const imageDisplay = localStorage.getItem("displayUrl");
  const image1 = localStorage.getItem("imageUrl_0");
  const image2 = localStorage.getItem("imageUrl_1");
  const image3 = localStorage.getItem("imageUrl_2");
  const image4 = localStorage.getItem("imageUrl_3");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format data produk
    const productData = {
      name: productName,
      description,
      category,
      color,
      image: imageDisplay, // Asumsikan displayImage adalah URL gambar utama
      price,
      stock,
      images: [image1, image2, image3, image4], // Asumsikan `images` adalah array URL gambar tambahan
      discount,
    };

    // Token harus diambil dari logika autentikasi Anda
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/product",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Produk berhasil ditambahkan", response.data);
      // Kosongkan formulir atau arahkan pengguna sesuai kebutuhan
    } catch (error) {
      console.error(
        "Gagal menambahkan produk",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nama Produk</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gambar Utama</label>
          <FirebaseImageUpload onImageUpload={(url) => setDisplayImage(url)} />
          {displayImage && (
            <img
              src={imageDisplay}
              alt="Display"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gambar Produk</label>
          <ImageProduct
            onImageUpload={(url) =>
              setImages((prevImages) => [...prevImages, url])
            }
          />
          {images.length > 0 && (
            <div className="mt-2">
              {images.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Produk ${index}`}
                  className="w-32 h-32 object-cover inline-block mr-2"
                />
              ))}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stok</label>
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
          <label className="block text-gray-700">Kategori</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Warna</label>
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Harga</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Diskon</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Deskripsi</label>
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
          Simpan Produk
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
