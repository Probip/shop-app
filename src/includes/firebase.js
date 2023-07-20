import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDQN9fYtyfXCn6oOokO9jKAb_TN_xB7gZI",
    authDomain: "webshop-4b105.firebaseapp.com",
    projectId: "webshop-4b105",
    storageBucket: "webshop-4b105.appspot.com",
    appId: "1:8261548380:web:edcb055915f8261ea36999"
};
firebase.initializeApp(firebaseConfig);
const authentification = firebase.auth();
const database = firebase.firestore();

const usersCollection = database.collection('users');
export {
    authentification,
    database,
    usersCollection,
}