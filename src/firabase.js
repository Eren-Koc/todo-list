import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJmJJ2WYstcViLUCdenuOiaYPvqAl2qwk",
    authDomain: "todolist-auth-8d6f9.firebaseapp.com",
    projectId: "todolist-auth-8d6f9",
    storageBucket: "todolist-auth-8d6f9.appspot.com",
    messagingSenderId: "549494307519",
    appId: "1:549494307519:web:44d0488f096ef7c240a40a",
    measurementId: "G-M5DJG92P2N"
  };


  const app = initializeApp(firebaseConfig);
  const db =  getFirestore(app);
  
  export {db};