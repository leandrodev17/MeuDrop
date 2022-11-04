
import Firebase from 'firebase';

const config = {
  apiKey: "AIzaSyCzN3V8HF61LZZ5tVaFRC1ffjYOr3rpwoQ",
    authDomain: "precodrop.firebaseapp.com",
    projectId: "precodrop",
    storageBucket: "precodrop.appspot.com",
    messagingSenderId: "241689530049",
    appId: "1:241689530049:web:91aa78a40b63ab54b94e40",
    measurementId: "G-ERPPSNKT1L"
};


let app = Firebase.initializeApp(config);
export const db = Firebase.database();
export const au = Firebase.auth()

