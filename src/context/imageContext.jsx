import React, { createContext, useState, useContext } from "react";

const ImageContext = createContext();

export const useImage = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [imageUrls, setImageUrls] = useState([]);

  const addImageUrl = (url) => {
    setImageUrls((prevUrls) => [...prevUrls, url]);
  };

  const removeImageUrl = (url) => {
    setImageUrls((prevUrls) => prevUrls.filter((item) => item !== url));
  };

  return (
    <ImageContext.Provider value={{ imageUrls, addImageUrl, removeImageUrl }}>
      {children}
    </ImageContext.Provider>
  );
};
