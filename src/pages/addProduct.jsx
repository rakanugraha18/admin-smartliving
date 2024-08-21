import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import UploadImageDisplay from "../components/molecules/ImageUploader/UploadImageDisplay";
import UploadProductImage from "../components/molecules/ImageUploader/UploadProductImage";

function AddProductPage() {
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [displayImage, setDisplayImage] = useState("");
  const navigate = useNavigate();

  // Ambil semua kunci dari localStorage
  const allKeys = Object.keys(localStorage);
  // Filter kunci yang dimulai dengan "imageUrl_"
  const imageKeys = allKeys.filter((key) => key.startsWith("imageUrl_"));
  // Ambil semua URL berdasarkan kunci yang sesuai
  const imageUrls = imageKeys.map((key) => localStorage.getItem(key));
  // Output hasilnya

  // Mendapatkan gambar dari local storage saat komponen pertama kali dimuat
  useEffect(() => {
    const imageDisplay = localStorage.getItem("displayUrl");
    if (imageDisplay) {
      setDisplayImage(imageDisplay);
    }

    const storedImages = [];
    for (let i = 0; i <= 5; i++) {
      const imageUrl = localStorage.getItem(`imageUrl_${i}`);
      if (imageUrl) {
        storedImages.push(imageUrl);
      }
    }
    setImages(storedImages);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Format data produk
    const productData = {
      name: productName,
      description,
      category,
      color,
      image: displayImage,
      price,
      stock,
      images: imageUrls,
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

      // Remove images from local storage
      const imageKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith("imageUrl_")
      );
      imageKeys.forEach((key) => localStorage.removeItem(key));
      localStorage.removeItem(`displayUrl`);

      navigate("/");
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
          <label className="block text-gray-700">Gambar Display</label>
          <UploadImageDisplay />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gambar Produk</label>
          <UploadProductImage />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stok</label>
          <div className="flex items-center mt-1">
            <button
              type="button"
              onClick={() => setStock(stock > 0 ? stock - 1 : 0)}
              className="px-2 py-1 bg-[#16697A] text-white rounded-md"
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
              className="px-2 py-1 bg-[#16697A] text-white rounded-md"
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
          <label className="block text-gray-700">Diskon {"(%)"}</label>
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
          className="px-4 py-2 bg-[#16697A] text-white rounded-[15px]"
        >
          Simpan Produk
        </button>
      </form>
    </div>
  );
}

export default AddProductPage;
