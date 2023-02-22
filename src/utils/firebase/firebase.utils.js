// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword
} from 'firebase/auth'

import {
    getFirestore,
    doc,  //getting document instance
    getDoc,
    setDoc
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGwM8hENeo7Ve6U0nmg6DK1sMklEyHtv0",
    authDomain: "crown-store-db-657ca.firebaseapp.com",
    projectId: "crown-store-db-657ca",
    storageBucket: "crown-store-db-657ca.appspot.com",
    messagingSenderId: "306513529496",
    appId: "1:306513529496:web:8085e28c08188e026f5eed"
};

// Initialize Firebase 
// instance of firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

//set configartion for provider, how it should behave
googleProvider.setCustomParameters({
    prompt: "select_account"
})


export const auth = getAuth();

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore();

export const createUserDocumentFromAuth = async (user, additionalInfo = {}) => {
    const userDocRef = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = user;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        }
        catch (err) {
            console.log('Error creating new user', err.message);
        }
    }
    return userDocRef;
}

export const creatAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

