import Firebase from 'firebase';
let config = {
  apiKey: "AIzaSyAUWDBTbKqU5sO4c1FxBfCo5QkEvpyKou0",
    authDomain: "albya-a3c55.firebaseapp.com",
    databaseURL: "https://albya-a3c55.firebaseio.com",
    projectId: "albya-a3c55",
    storageBucket: "albya-a3c55.appspot.com",
    messagingSenderId: "1002284040958",
    appId: "1:1002284040958:web:340ea5485f92e070cb9baf",
    measurementId: "G-F65TR14Z96"
};
let app = Firebase.initializeApp(config);
export const db = app.database();
