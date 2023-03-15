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
    onAuthStateChanged,
    User,
    UserCredential,
    NextOrObserver
} from 'firebase/auth'

import {
    getFirestore,
    doc,  //getting document instance
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
    QueryDocumentSnapshot
} from 'firebase/firestore'
import { Category, CategoryItem } from "../../store/categories/categories.types";

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

export type IObjectToAdd = {
    title: string,
    items: CategoryItem[]
}

/**
 * 
 * @param {String} collectionKey name of collection
 * @param {Array} objectsToAdd products with respect to categories.. see in shop_data.js
 */
export const addCollectionAndDocuments = async (collectionKey: string, objectsToAdd: IObjectToAdd[]): Promise<void> => {
    const collectionRef = collection(db, collectionKey); //collection reg just like docRef = doc(db, docKey);
    const batch = writeBatch(db); //batch for writing more than 1 data inside db

    objectsToAdd.forEach((category) => {
        const docRef = doc(collectionRef, category.title.toLowerCase());
        batch.set(docRef, category)
    })
    await batch.commit(); //after ending batch session
    console.log('successfully migrated');
}

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnapShot) => docSnapShot.data() as Category);
}
export type IUserData = {
    displayName: string,
    email: string,
    createdAt: Date
}
export type IAdditionalInfo = {
    displayName?: string
}
export const createUserDocumentFromAuth = async (userAuth: User, additionalInfo = {} as IAdditionalInfo): Promise<void | QueryDocumentSnapshot<IUserData>> => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        }
        catch (err: unknown) {
            console.log('Error creating new user', err);
        }
    }
    return userSnapshot as QueryDocumentSnapshot<IUserData>;
    // return userDocRef;
}

export const creatAuthUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | void> => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential | void> => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

//auth keeps track of which user is signed in/signout
export const signingOutUser = async () => await signOut(auth)

//on onAuthStateChanged listen to `auth` and whenever i chnages(on signin, signout)
//it takes, auth, and callback -> runs whever auth changes
export const authStateChangeListner = (callback: NextOrObserver<User>) => {
    return onAuthStateChanged(auth, callback)
}

export const getCurrentUser = (): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}

