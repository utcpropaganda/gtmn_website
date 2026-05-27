import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  OAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyCyjxMKUV6Q9RRXlTJySb3S8klujkagkns",
  authDomain: "gtmn-database.firebaseapp.com",
  projectId: "gtmn-database",
  storageBucket: "gtmn-database.firebasestorage.app",
  messagingSenderId: "204952991922",
  appId: "1:204952991922:web:89693d4cafb817ba6631ab",
  measurementId: "G-LGL7NHMKJL"
};
//For the love of all that is holy DO NOT CHANGE ANY OF THE ABOVE

const checkHealthButton = document.getElementById("healthCheckButton");
const testP = document.getElementById("testP");
const loginButton = document.getElementById("loginButton");

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function checkHealth() {
    try {
        const response = await fetch("http://localhost:8080/api/healthcheck");

        testP.innerText = response.ok;
    }
    catch(err)
    {
        testP.innerText = false;
    }

}

checkHealthButton.addEventListener("click", checkHealth, false);

function toggleSignIn() {
  console.log("toggle log in")
  if (!auth.currentUser) {
    const provider = new OAuthProvider('microsoft.com');
    provider.addScope('User.Read');
    provider.setCustomParameters({
      tenant: 'gatech.edu'
    });
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("Signed in as:", result.user.email);
      })
      .catch((error) => {
        console.error("Auth error:", error.code, error.message);
        loginButton.disabled = false;
      });
  } else {
    signOut(auth);
  }
  loginButton.disabled = true;
}

onAuthStateChanged(auth, function (user){
    if (user)
        console.log("Login Successful")
    else
        console.log("Login Failure")
})
loginButton.addEventListener("click", toggleSignIn, false);