import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyArRGr84X_5nlOi9MDeSt0_t_B4YCErJ-M",
  authDomain: "react-crud-19aea.firebaseapp.com",
  databaseURL: "https://react-crud-19aea.firebaseio.com",
  projectId: "react-crud-19aea",
  storageBucket: "react-crud-19aea.appspot.com",
  messagingSenderId: "404373296422",
  appId: "1:404373296422:web:2ff9cfc03b04b0d70f9de7"
};

firebase.initializeApp(config);
export default firebase;
