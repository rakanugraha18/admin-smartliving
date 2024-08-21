import React, { createContext, useState, useContext } from "react";

const ImageContext = createContext();

export const useImgUrlContext = () => useContext(ImageContext);

export const ImageProvider = ({ children }) => {
  const [images, setImages] = useState([]);

  return (
    <ImageContext.Provider value={{ images, setImages }}>
      {children}
    </ImageContext.Provider>
  );
};
