import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAN_0hQMVVgCtym0VIA01RzMXG4bv-13pE",
  authDomain: "task-uploader-application.firebaseapp.com",
  projectId: "task-uploader-application",
  storageBucket: "task-uploader-application.appspot.com",
  messagingSenderId: "590648366799",
  appId: "1:590648366799:web:73d90e60f968cb229509ba",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);

export default firebaseConfig;
