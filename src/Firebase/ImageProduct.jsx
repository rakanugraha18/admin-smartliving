import React, { useEffect, useState } from "react";
import { imageDb } from "./config";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import Button from "../components/atoms/Button";

function ImageProduct() {
  const [imgs, setImgs] = useState([]);
  const [imgRefs, setImgRefs] = useState([]);
  const [newImg, setNewImg] = useState(null);

  const folderPath = "product-images"; // Folder path for storing images

  // Fungsi untuk mengunggah gambar
  const uploadImage = async () => {
    if (newImg) {
      try {
        const imgRef = ref(imageDb, `${folderPath}/${v4()}`);
        await uploadBytes(imgRef, newImg);
        fetchImageUrls();
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  // Fungsi untuk menghapus gambar
  const deleteImage = async (index) => {
    try {
      const imageRef = imgRefs[index];
      await deleteObject(imageRef);
      fetchImageUrls();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Fungsi untuk mengambil URL gambar dan menyimpannya ke localStorage
  const fetchImageUrls = async () => {
    try {
      const imgsList = await listAll(ref(imageDb, folderPath));
      const urls = await Promise.all(
        imgsList.items.map(async (item, index) => {
          const url = await getDownloadURL(item);
          console.log(`imageUrl_${index}`, url);
          localStorage.setItem(`imageUrl_${index}`, url); // Simpan ke localStorage
          return { url, ref: item };
        })
      );
      const newUrls = urls.slice(-4); // Keep only the last 4 images
      setImgs(newUrls.map((item) => item.url));
      setImgRefs(newUrls.map((item) => item.ref));

      // Log to see the URLs saved in localStorage
      console.log(
        "Saved URLs in localStorage:",
        newUrls.map((item, index) => ({
          index,
          url: localStorage.getItem(`imageUrl_${index}`),
        }))
      );
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImageUrls(); // Fetch URLs on component mount
  }, []);

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setNewImg(e.target.files[0])}
        accept="image/*"
      />
      <Button size="small" onClick={uploadImage}>
        Upload
      </Button>
      {/* <div>
        {imgs.map((url, index) => (
          <div
            key={index}
            style={{
              position: "relative",
              display: "inline-block",
              margin: "10px",
            }}
          >
            <img
              src={url}
              alt={`Uploaded ${index}`}
              style={{ width: "300px", height: "auto" }}
            />
            <button
              onClick={() => deleteImage(index)}
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                background: "red",
                color: "white",
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div> */}
    </div>
  );
}

export default ImageProduct;
