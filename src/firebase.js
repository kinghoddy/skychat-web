import * as firebase from "firebase/app";


firebase.initializeApp(config);


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCKMoKc1Cft0WG1etZLvnmh5ytzdckkIcg",
    authDomain: "skymail-920ab.firebaseapp.com",
    databaseURL: "https://skymail-920ab.firebaseio.com",
    projectId: "skymail-920ab",
    storageBucket: "skymail-920ab.appspot.com",
    messagingSenderId: "795125035544",
    appId: "1:795125035544:web:bc6cddb5e006c3bfdd496d",
    measurementId: "G-Z3K3MYS9NC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



export default firebase;