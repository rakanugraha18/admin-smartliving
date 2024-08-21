// import React, { useState } from "react";
// import axios from "axios";
// import {
//   ref,
//   getDownloadURL,
//   uploadBytesResumable,
//   deleteObject,
// } from "firebase/storage";
// import { imageDb } from "../../../Firebase/firebaseConfig";

// const UploadProductImage = () => {
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [images, setImages] = useState([]); // State to hold uploaded images
//   const [uploadComplete, setUploadComplete] = useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Reset state before starting a new upload
//       setUploadProgress(0);
//       setUploadComplete(false);
//       uploadImage(file);
//     }
//   };

//   const uploadImage = (image) => {
//     const imageRef = ref(imageDb, `all-product/${image.name}`);
//     const uploadTask = uploadBytesResumable(imageRef, image);

//     uploadTask.on(
//       "state_changed",
//       (snapshot) => {
//         const progress =
//           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         setUploadProgress(progress);
//       },
//       (error) => {
//         console.error("Upload failed:", error);
//       },
//       () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((url) => {
//           setImages((prevImages) => {
//             // Update images state with the new URL, keeping only the last 5 images
//             const updatedImages = [...prevImages, url].slice(-5);
//             return updatedImages;
//           });
//           setUploadComplete(true);

//           // Fetch all current URLs from localStorage
//           const imageUrls = [];
//           let index = 1;
//           while (localStorage.getItem(`imageUrl_${index}`)) {
//             imageUrls.push(localStorage.getItem(`imageUrl_${index}`));
//             index++;
//           }

//           // Add the new URL to the list
//           imageUrls.push(url);

//           // Keep only the last 5 URLs
//           const latestImageUrls = imageUrls.slice(-5);

//           // Save the URLs back to localStorage
//           latestImageUrls.forEach((url, i) => {
//             localStorage.setItem(`imageUrl_${i + 1}`, url);
//           });

//           // Remove old keys if there were more than 5 URLs
//           for (let i = latestImageUrls.length + 1; i <= 5; i++) {
//             localStorage.removeItem(`imageUrl_${i}`);
//           }
//         });
//       }
//     );
//   };

//   const handleDelete = async (imageUrl) => {
//     // Get the image reference from the URL
//     const imageName = imageUrl.split("/").pop();
//     const imageRef = ref(imageDb, `all-product/${imageName}`);

//     try {
//       // Delete image from Firebase
//       await deleteObject(imageRef);

//       // Update localStorage and state
//       const updatedImages = images.filter((url) => url !== imageUrl);
//       setImages(updatedImages);

//       // Update localStorage
//       const imageUrls = updatedImages;
//       imageUrls.forEach((url, index) => {
//         localStorage.setItem(`imageUrl_${index + 1}`, url);
//       });

//       // Remove old keys if there were more than 5 URLs
//       for (let i = imageUrls.length + 1; i <= 5; i++) {
//         localStorage.removeItem(`imageUrl_${i}`);
//       }
//     } catch (error) {
//       console.error("Delete failed:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col relative justify-center items-center">
//       <div className="flex flex-col items-center space-y-4 p-5">
//         <input
//           type="file"
//           onChange={handleFileChange}
//           className="block w-full text-sm text-gray-500
//                    file:mr-4 file:py-2 file:px-4
//                    file:rounded-full file:border-0
//                    file:text-sm file:font-semibold
//                    file:bg-violet-50 file:text-violet-700
//                    hover:file:bg-violet-100"
//         />

//         {uploadProgress > 0 && !uploadComplete && (
//           <div className="absolute inset-0 flex items-center justify-center z-50">
//             <div className="h-20 w-20 relative">
//               <div
//                 className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-transparent border-blue-500 animate-spin"
//                 style={{ borderTopColor: "transparent" }}
//               ></div>
//               <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//                 <span className="text-blue-500">
//                   {Math.round(uploadProgress)}%
//                 </span>
//               </div>
//             </div>
//           </div>
//         )}

//         {uploadComplete && (
//           <div className="text-green-500 font-semibold">Upload Success!</div>
//         )}

//         <div className="grid grid-cols-5 gap-2 mt-4">
//           {images.map((url, index) => (
//             <div key={index} className="relative">
//               <img
//                 src={url}
//                 alt={`Uploaded ${index}`}
//                 className="w-96 object-cover"
//               />
//               <button
//                 onClick={() => handleDelete(url)}
//                 className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
//               >
//                 X
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadProductImage;

import React, { useState } from "react";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { imageDb } from "../../../Firebase/firebaseConfig";

const UploadProductImage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [images, setImages] = useState([]); // State to hold uploaded images
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Reset state before starting a new upload
      setUploadProgress(0);
      setUploadComplete(false);
      uploadImage(file);
    }
  };

  const uploadImage = (image) => {
    const imageRef = ref(imageDb, `all-product/${image.name}`);
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
          setImages((prevImages) => {
            // Update images state with the new URL, keeping only the last 5 images
            const updatedImages = [...prevImages, url].slice(-5);
            return updatedImages;
          });
          setUploadComplete(true);

          // Fetch all current URLs from localStorage
          const imageUrls = [];
          let index = 1;
          while (localStorage.getItem(`imageUrl_${index}`)) {
            imageUrls.push(localStorage.getItem(`imageUrl_${index}`));
            index++;
          }

          // Add the new URL to the list
          imageUrls.push(url);

          // Keep only the last 5 URLs
          const latestImageUrls = imageUrls.slice(-5);

          // Save the URLs back to localStorage
          latestImageUrls.forEach((url, i) => {
            localStorage.setItem(`imageUrl_${i + 1}`, url);
          });

          // Remove old keys if there were more than 5 URLs
          for (let i = latestImageUrls.length + 1; i <= 5; i++) {
            localStorage.removeItem(`imageUrl_${i}`);
          }
        });
      }
    );
  };

  const handleDeleteImages = async (imageUrl, event) => {
    event.stopPropagation();
    try {
      // Decode URL and extract the file name
      const decodedUrl = decodeURIComponent(
        imageUrl.split("/o/")[1].split("?")[0]
      );
      const imageName = decodedUrl.replace(/%2F/g, "/"); // Replace %2F with /

      // Create a reference to the image in Firebase Storage
      const imageRef = ref(imageDb, `${imageName}`);
      console.log(`Attempting to delete: ${imageName}`); // Debug log

      // Delete image from Firebase
      await deleteObject(imageRef);
      console.log(`Successfully deleted: ${imageName}`); // Debug log

      // Update state and localStorage
      const updatedImages = images.filter((url) => url !== imageUrl);
      setImages(updatedImages);

      // Update localStorage
      updatedImages.forEach((url, index) => {
        localStorage.setItem(`imageUrl_${index + 1}`, url);
      });
      setUploadComplete(false);
      setUploadProgress(0); // Reset upload progress
      // Remove old keys if there were more than 5 URLs
      for (let i = updatedImages.length + 1; i <= 5; i++) {
        localStorage.removeItem(`imageUrl_${i}`);
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div className="flex flex-col relative justify-center items-center">
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
            <div className="h-20 w-20 relative">
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

        <div className="flex justify-between items-center gap-2 mt-4">
          {images.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Uploaded ${index}`}
                className="w-96 object-cover"
              />
              <button
                type="button"
                onClick={(e) => handleDeleteImages(url, e)}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadProductImage;
