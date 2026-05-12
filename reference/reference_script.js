import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js'
import {
  OAuthProvider,
  connectAuthEmulator,
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyDn_JiRAFEEVbiRcGElwm9nXFa2yJxf02g",
  authDomain: "gtmn-49cbc.firebaseapp.com",
  projectId: "gtmn-49cbc",
  storageBucket: "gtmn-49cbc.firebasestorage.app",
  messagingSenderId: "110851517589",
  appId: "1:110851517589:web:a808056bd8f904faae7f9c"
};

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

/*if (window.location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
} */ // ? 

function toggleSignIn() {
  console.log("toggle log in")
  if (!auth.currentUser) {
    const provider = new OAuthProvider('microsoft.com');
    provider.addScope('User.Read');
    signInWithRedirect(auth, provider);
  } else {
    signOut(auth);
  }
  loginButton.disabled = true;
}

onAuthStateChanged(auth, function (user){
    if (user)
        console.log("login!")
    else
        console.log("not log in")
})

const button = document.querySelector("#printButton")
const loginButton = document.querySelector("#loginButton")
const submitButton = document.querySelector("#submitButton")
const userid = document.querySelector("#useridInput")
const reason = document.querySelector("#reasonInput")
const day = document.querySelector("#dayInput")

loginButton.addEventListener("click", toggleSignIn, false)


button.addEventListener("click", async () =>{
    console.log("clicked");
    var response = await fetch("http://localhost:8080/api/schedule")
    var output = await response.json()
    console.log(output)
})

submitButton.addEventListener("click", async ()=> {
    console.log("submit button clicked")
    console.log(userid.value)
    console.log(reason.value)
    console.log(day.value)

   /*var response = await fetch("http://localhost:8080/api/schedule")
    var output = await response.json()
    console.log(output)*/

    var response = await fetch(`http://localhost:8080/api/book/${day.value}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userid: userid.value,
            reason: reason.value
        })
    })
    var output = await response.text()
    console.log(output)

    /*response = await fetch("http://localhost:8080/api/schedule")
    output = await response.json()
    console.log(output)*/

});
