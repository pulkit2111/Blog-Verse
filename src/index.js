import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./Components/App";
import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: "AIzaSyCoObvFFcDxtcB9vdM3DTwd0zoNwV3DhuA",
  authDomain: "blog-photos-9c48e.firebaseapp.com",
  projectId: "blog-photos-9c48e",
  storageBucket: "blog-photos-9c48e.appspot.com",
  messagingSenderId: "553258381345",
  appId: "1:553258381345:web:d9cf25fdd544b77d6a3360",
  measurementId: "G-FD7YQJYSGR"
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

