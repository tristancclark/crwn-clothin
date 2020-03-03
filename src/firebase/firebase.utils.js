import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBs8XpeXVUjRVV5eFbppr6tSAJqH0d56mE",
    authDomain: "crwn-db-dbe35.firebaseapp.com",
    databaseURL: "https://crwn-db-dbe35.firebaseio.com",
    projectId: "crwn-db-dbe35",
    storageBucket: "crwn-db-dbe35.appspot.com",
    messagingSenderId: "833047885238",
    appId: "1:833047885238:web:38a8b412ad3a9f75f5fd17",
    measurementId: "G-VM1NTCNW20"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt : 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log(error);
        }
    }

    return userRef;
}

export default firebase;