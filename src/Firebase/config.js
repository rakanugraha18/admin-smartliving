import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAi87r3Wl4ikjZzN139cSGzPbzcwzRjXg4",
  authDomain: "smartliving-image-1af06.firebaseapp.com",
  projectId: "smartliving-image-1af06",
  storageBucket: "smartliving-image-1af06.appspot.com",
  messagingSenderId: "967926404369",
  appId: "1:967926404369:web:239d5e6692920406cbe8b0",
};

const app = initializeApp(firebaseConfig);

export const imageDB = getStorage(app);
