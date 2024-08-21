import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/atoms/Button";
import { useNavigate, useParams } from "react-router-dom";
import UploadImageDisplay from "../components/molecules/ImageUploader/UploadImageDisplay";
import UploadProductImage from "../components/molecules/ImageUploader/UploadProductImage";

// Function to retrieve all image URLs from local storage
const getLocalStorageImageUrls = () => {
  const allKeys = Object.keys(localStorage);
  const imageKeys = allKeys.filter((key) => key.startsWith("imageUrl_"));
  return imageKeys.map((key) => localStorage.getItem(key));
};

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
  const { id } = useParams();

  useEffect(() => {
    // Fetch product data by ID
    axios
      .get(`${import.meta.env.VITE_API_BASEURL}/api/product/${id}`)
      .then((response) => {
        const product = response.data;
        setProductName(product.name);
        setStock(product.stock);
        setCategory(product.category);
        setColor(product.color);
        setPrice(product.price);
        setDiscount(product.discount);
        setDescription(product.description);
        setDisplayImage(product.image);
        setImages(product.images.map((img) => img.image_url));

        localStorage.setItem("displayUrl", product.image);

        console.log(product.image);
        // Store each image URL in local storage with a unique key
        product.images.forEach((img, index) => {
          localStorage.setItem(`imageUrl_${index + 1}`, img.image_url);
        });
      })
      .catch((error) => console.error("Error fetching product data", error));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get image URLs from local storage
    const imageUrls = getLocalStorageImageUrls();

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
        `${import.meta.env.VITE_API_BASEURL}/api/product`,
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
          <UploadImageDisplay onImageUpload={setDisplayImage} />
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
