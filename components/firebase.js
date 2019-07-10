import * as firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDnOjU0mcYUiQiFJvhlHVQxaWGscjgiOLw",
  authDomain: "matka-tips-today.firebaseapp.com",
  databaseURL: "https://matka-tips-today.firebaseio.com",
  projectId: "matka-tips-today"
};

firebase.initializeApp(config);

export default firebase;
