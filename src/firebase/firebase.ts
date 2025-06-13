import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBfhvI-MQPNUNdF6CC6SBEBh0s3x2ZoWn8",
  authDomain: "wishu-f84b4.firebaseapp.com",
  projectId: "wishu-f84b4",
  storageBucket: "wishu-f84b4.firebasestorage.app",
  messagingSenderId: "142162256615",
  appId: "1:142162256615:web:8a2c12f15ec991b280f842",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
