import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";



const firebaseConfig = {
    apiKey: "AIzaSyCplNHmDQ-iytGBjJMhzLLkGVJfZf1tCiM",
    authDomain: "ecom-classwrk.firebaseapp.com",
    projectId: "ecom-classwrk",
    storageBucket: "ecom-classwrk.firebasestorage.app",
    messagingSenderId: "971597633294",
    appId: "1:971597633294:web:d0aa21ec65e67186b7a95f"
};

 const app = initializeApp(firebaseConfig);

 console.log(app)