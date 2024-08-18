import React, { useState, useEffect } from "react";
import FirebaseImageUpload from "../Firebase/FirebaseImageUpload";
import ImageProduct from "../Firebase/ImageProduct";
import axios from "axios";
import Button from "../components/atoms/Button";
import { useNavigate } from "react-router-dom";

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
      images,
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

      localStorage.removeItem(
        "displayUrl",
        "imageUrl_0",
        "imageUrl_1",
        "imageUrl_2",
        "imageUrl_3",
        "imageUrl_4",
        "imageUrl_5"
      );
      navigate("/");
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
              src={displayImage}
              alt="Display"
              className="mt-2 max-w-full object-cover"
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
                  className="max-w-[300px] object-cover inline-block m-2 "
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
        <Button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Simpan Produk
        </Button>
      </form>
    </div>
  );
}

export default AddProductPage;
