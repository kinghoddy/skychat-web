import * as firebase from "firebase/app";

var config = {
    apiKey: 'AIzaSyCKMoKc1Cft0WG1etZLvnmh5ytzdckkIcg',
    databaseURL: "https://skymail-920ab.firebaseio.com",
    storageBucket: "skymail-920ab.appspot.com",
    authDomain: "skymail-920ab.firebaseapp.com",

};
firebase.initializeApp(config);



export default firebase