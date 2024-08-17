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

function FirebaseImageUpload() {
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgRef, setImgRef] = useState(null);

  // Function to upload image
  const uploadImage = async (file) => {
    try {
      const imgRef = ref(imageDb, `files/${v4()}`);
      await uploadBytes(imgRef, file);
      return imgRef;
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Function to fetch image URLs
  const fetchImageUrls = async () => {
    try {
      const imgs = await listAll(ref(imageDb, "files"));
      const urlPromises = imgs.items.map(async (item) => {
        const url = await getDownloadURL(item);
        return { url, ref: item };
      });
      return await Promise.all(urlPromises);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleClick = async () => {
    if (img) {
      console.log("Uploading image:", img);
      const uploadedImgRef = await uploadImage(img);
      const urlArray = await fetchImageUrls();
      if (urlArray.length > 0) {
        const latestImage = urlArray[urlArray.length - 1];
        setImgUrl(latestImage.url);
        setImgRef(latestImage.ref);
      }
    }
  };

  const handleDelete = async () => {
    if (imgRef) {
      try {
        await deleteObject(imgRef);
        console.log("Image deleted successfully.");
        setImgUrl(null);
        setImgRef(null);
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  useEffect(() => {
    const fetchImagesOnMount = async () => {
      const urlArray = await fetchImageUrls();
      if (urlArray.length > 0) {
        const latestImage = urlArray[urlArray.length - 1];
        setImgUrl(latestImage.url);
        setImgRef(latestImage.ref);
        localStorage.setItem("imgUrl", latestImage.url);
      }
    };

    fetchImagesOnMount();
  }, []);

  return (
    <div>
      <input
        type="file"
        onChange={(e) => setImg(e.target.files[0])}
        accept="image/*"
      />
      <button onClick={handleClick}>Upload</button>
      <div>
        {imgUrl && (
          <div
            style={{
              position: "relative",
              display: "inline-block",
              margin: "10px",
            }}
          >
            <img
              src={imgUrl}
              alt="Uploaded"
              style={{ width: "auto", height: "auto" }}
            />
            <button
              onClick={handleDelete}
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
        )}
      </div>
    </div>
  );
}

export default FirebaseImageUpload;
