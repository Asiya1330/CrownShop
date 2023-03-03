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
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

import {
    getFirestore,
    doc,  //getting document instance
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
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

/**
 * 
 * @param {String} collectionKey name of collection
 * @param {Array} objectsToAdd products with respect to categories.. see in shop_data.js
 */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey); //collection reg just like docRef = doc(db, docKey);
    const batch = writeBatch(db); //batch for writing more than 1 data inside db

    objectsToAdd.forEach((category) => {
        const docRef = doc(collectionRef, category.title.toLowerCase());
        batch.set(docRef, category)
    })
    await batch.commit(); //after ending batch session
    console.log('successfully migrated');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnapShot) => docSnapShot.data());
}

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
export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

//auth keeps track of which user is signed in/signout
export const signingOutUser = async () => await signOut(auth)

//on onAuthStateChanged listen to `auth` and whenever i chnages(on signin, signout)
//it takes, auth, and callback -> runs whever auth changes
export const authStateChangeListner = (callback) => {
    return onAuthStateChanged(auth, callback)
}


