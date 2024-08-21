// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Button from "../components/atoms/Button";
// import { useNavigate, useParams } from "react-router-dom";
// import UploadImageDisplay from "../components/molecules/ImageUploader/UploadImageDisplay";
// import UploadProductImage from "../components/molecules/ImageUploader/UploadProductImage";

// // Ambil semua kunci dari localStorage
// const allKeys = Object.keys(localStorage);
// // Filter kunci yang dimulai dengan "imageUrl_"
// const imageKeys = allKeys.filter((key) => key.startsWith("imageUrl_"));
// // Ambil semua URL berdasarkan kunci yang sesuai
// const imageUrls = imageKeys.map((key) => localStorage.getItem(key));
// // Output hasilnya

// function EditProductPage() {
//   const [productName, setProductName] = useState("");
//   const [stock, setStock] = useState(0);
//   const [category, setCategory] = useState("");
//   const [color, setColor] = useState("");
//   const [price, setPrice] = useState("");
//   const [discount, setDiscount] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState([]);
//   const [displayImage, setDisplayImage] = useState("");
//   const navigate = useNavigate();
//   const { id } = useParams();

//   useEffect(() => {
//     // Fetch product data by ID
//     axios
//       .get(`http://localhost:3000/api/product/${id}`)
//       .then((response) => {
//         const product = response.data;
//         setProductName(product.name);
//         setStock(product.stock);
//         setCategory(product.category);
//         setColor(product.color);
//         setPrice(product.price);
//         setDiscount(product.discount);
//         setDescription(product.description);
//         setDisplayImage(product.image);
//         setImages(product.images.map((img) => img.image_url));

//         localStorage.setItem("displayUrl", product.image);

//         // Store each image URL in local storage with a unique key
//         product.images.forEach((img, index) => {
//           localStorage.setItem(`imageUrl_${index + 1}`, img.image_url);
//         });
//       })

//       .catch((error) => console.error("Error fetching product data", error));
//   }, [id]);

//   const handleDeleteImage = async (imageUrl) => {
//     try {
//       // Remove the image from the local state
//       const updatedImages = images.filter((img) => img !== imageUrl);
//       setImages(updatedImages);

//       // Update the product data on the server
//       await axios.put(
//         `http://localhost:3000/api/product/${id}`,
//         {
//           name: productName,
//           description,
//           category,
//           color,
//           image: displayImage,
//           price,
//           stock,
//           images: updatedImages,
//           discount,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       console.log("Image deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete image", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const productData = {
//       name: productName,
//       description,
//       category,
//       color,
//       image: displayImage,
//       price,
//       stock,
//       images: imageUrls,
//       discount,
//     };

//     try {
//       await axios.put(`http://localhost:3000/api/product/${id}`, productData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });

//       // Remove images from local storage
//       const imageKeys = Object.keys(localStorage).filter((key) =>
//         key.startsWith("imageUrl_")
//       );
//       imageKeys.forEach((key) => localStorage.removeItem(key));

//       localStorage.removeItem(`displayUrl`);

//       navigate("/");
//     } catch (error) {
//       console.error(
//         "Failed to update product",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700">Nama Produk</label>
//           <input
//             type="text"
//             value={productName}
//             onChange={(e) => setProductName(e.target.value)}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Gambar Display</label>
//           <UploadImageDisplay />

//           <div
//             style={{
//               position: "relative",
//               display: "inline-block",
//               margin: "10px",
//             }}
//           >
//             <img
//               src={displayImage}
//               alt=""
//               style={{ maxWidth: "150px", maxHeight: "150px" }}
//             />
//             <button
//               onClick={() => handleDeleteImage(displayImage)}
//               style={{
//                 position: "absolute",
//                 top: 0,
//                 right: 0,
//                 background: "red",
//                 color: "white",
//                 border: "none",
//                 padding: "5px",
//                 cursor: "pointer",
//               }}
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Gambar Produk</label>
//           <UploadProductImage />
//           <div className="mt-4">
//             {images.map((image, index) => (
//               <div
//                 key={index}
//                 style={{
//                   position: "relative",
//                   display: "inline-block",
//                   margin: "10px",
//                 }}
//               >
//                 <img
//                   src={image}
//                   alt=""
//                   style={{ maxWidth: "150px", maxHeight: "150px" }}
//                 />
//                 <button
//                   onClick={() => handleDeleteImage(image)}
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     background: "red",
//                     color: "white",
//                     border: "none",
//                     padding: "5px",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Stok</label>
//           <div className="flex items-center mt-1">
//             <button
//               type="button"
//               onClick={() => setStock(stock > 0 ? stock - 1 : 0)}
//               className="px-2 py-1 bg-[#16697A] text-white rounded-md"
//             >
//               -
//             </button>
//             <input
//               type="number"
//               value={stock}
//               onChange={(e) => setStock(Number(e.target.value))}
//               className="mx-2 p-2 border border-gray-300 rounded-md w-16 text-center"
//             />
//             <button
//               type="button"
//               onClick={() => setStock(stock + 1)}
//               className="px-2 py-1 bg-[#16697A] text-white rounded-md"
//             >
//               +
//             </button>
//           </div>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Kategori</label>
//           <input
//             type="text"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Warna</label>
//           <input
//             type="text"
//             value={color}
//             onChange={(e) => setColor(e.target.value)}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Harga</label>
//           <input
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Diskon</label>
//           <input
//             type="number"
//             value={discount}
//             onChange={(e) => setDiscount(e.target.value)}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700">Deskripsi</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full mt-1 p-2 border border-gray-300 rounded-md"
//             rows="4"
//           ></textarea>
//         </div>
//         <Button
//           type="submit"
//           className="px-4 py-2 bg-blue-500 text-white rounded-md"
//         >
//           Simpan Produk
//         </Button>
//       </form>
//     </div>
//   );
// }

// export default EditProductPage;

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

function EditProductPage() {
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
      .get(`http://localhost:3000/api/product/${id}`)
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

        // Store each image URL in local storage with a unique key
        product.images.forEach((img, index) => {
          localStorage.setItem(`imageUrl_${index + 1}`, img.image_url);
        });
      })
      .catch((error) => console.error("Error fetching product data", error));
  }, [id]);

  const handleDeleteImage = async (imageUrl, index) => {
    try {
      // Remove the image from the local state
      const updatedImages = images.filter((_, imgIndex) => imgIndex !== index);
      setImages(updatedImages);

      // Remove the image URL from local storage
      localStorage.removeItem(`imageUrl_${index + 1}`);

      // Update the product data on the server
      await axios.put(
        `http://localhost:3000/api/product/${id}`,
        {
          name: productName,
          description,
          category,
          color,
          image: displayImage,
          price,
          stock,
          images: updatedImages,
          discount,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Failed to delete image", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get image URLs from local storage
    const imageUrls = getLocalStorageImageUrls();

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

    try {
      await axios.put(`http://localhost:3000/api/product/${id}`, productData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Remove images from local storage only after a successful update
      const imageKeys = Object.keys(localStorage).filter((key) =>
        key.startsWith("imageUrl_")
      );
      imageKeys.forEach((key) => localStorage.removeItem(key));
      localStorage.removeItem("displayUrl");

      navigate("/");
    } catch (error) {
      console.error(
        "Failed to update product",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Produk</h1>
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

          <div
            style={{
              position: "relative",
              display: "inline-block",
              margin: "10px",
            }}
          >
            <img
              src={displayImage}
              alt=""
              style={{ maxWidth: "150px", maxHeight: "150px" }}
            />
            <button
              type="button"
              onClick={() => handleDeleteImage(displayImage, -1)} // Pass -1 or other value for display image
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gambar Produk</label>
          <UploadProductImage />
          <div className="mt-4">
            {images.map((image, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  display: "inline-block",
                  margin: "10px",
                }}
              >
                <img
                  src={image}
                  alt=""
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
                <button
                  onClick={() => handleDeleteImage(image, index)}
                  className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
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
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-[#16697A] text-white rounded-[15px]"
        >
          Update Produk
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;
