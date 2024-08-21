import React, { useState } from "react";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { imageDb } from "../../../Firebase/firebaseConfig";

const UploadImageDisplay = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadComplete, setUploadComplete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const uploadImage = (image) => {
    const imageRef = ref(imageDb, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Upload failed:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUrl(url);
          setUploadComplete(true); // Mark upload as complete
          localStorage.setItem("displayUrl", url);
        });
      }
    );
  };

  const handleDelete = async () => {
    if (!imageUrl) return; // Ensure there is an image to delete

    setDeleting(true);

    // Extract file name from the URL
    const fileName = imageUrl
      .split("/o/")[1]
      .split("?")[0]
      .replace(/%2F/g, "/");
    const imageRef = ref(imageDb, `/${fileName}`);

    try {
      await deleteObject(imageRef);
      console.log("Image deleted successfully");
      setImageUrl("");
      setUploadComplete(false);
      setUploadProgress(0); // Reset upload progress
      localStorage.removeItem("displayUrl");
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex justify-center relative flex-col items-center">
      <div className="flex flex-col items-center space-y-4 p-5">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100"
        />

        {uploadProgress > 0 && !uploadComplete && (
          <div className="absolute inset-0 flex items-center justify-center z-50">
            <div className="relative w-20 h-20">
              <div
                className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-transparent border-blue-500 animate-spin"
                style={{ borderTopColor: "transparent" }}
              ></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-blue-500">
                  {Math.round(uploadProgress)}%
                </span>
              </div>
            </div>
          </div>
        )}

        {uploadComplete && (
          <div className="text-green-500 font-semibold">Upload Success!</div>
        )}

        {imageUrl && (
          <div className="mt-4 relative">
            <img src={imageUrl} className="w-36 object-cover" />
            <button
              type="button"
              onClick={handleDelete}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadImageDisplay;
