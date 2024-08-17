import React, { useEffect, useState } from "react";
import { imageDB } from "./config";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function FirebaseImageUpload() {
  const [img, setImg] = useState(null);
  const [imgUrls, setImgUrls] = useState([]);

  const handleClick = () => {
    if (img) {
      const imgRef = ref(imageDB, `files/${v4()}`);
      uploadBytes(imgRef, img)
        .then(() => {
          // Optional: Refresh the image list after upload
          return listAll(ref(imageDB, "files"));
        })
        .then((imgs) => {
          const urls = imgs.items.map((item) =>
            getDownloadURL(item).then((url) => url)
          );
          Promise.all(urls).then((urlArray) => setImgUrls(urlArray));
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  useEffect(() => {
    listAll(ref(imageDB, "files"))
      .then((imgs) => {
        const urls = imgs.items.map((item) =>
          getDownloadURL(item).then((url) => url)
        );
        return Promise.all(urls);
      })
      .then((urlArray) => setImgUrls(urlArray))
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);
  console.log(imgUrls);
  return (
    <div>
      <input type="file" onChange={(e) => setImg(e.target.files[0])} />
      <button onClick={handleClick}>Upload</button>
      <div>
        {imgUrls.map((url, index) => (
          <img key={index} src={url} alt={`Uploaded ${index}`} />
        ))}
      </div>
    </div>
  );
}

export default FirebaseImageUpload;
