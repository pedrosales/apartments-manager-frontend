import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
};

class Firebase {
    constructor() {
        firebase.initializeApp(config);
        this.auth = firebase.auth();
    }

    async login(email, password) {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
            console.log(err);
            return err;
        });

        return user;
    }

    async loginGoogle() {
        const user = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(err => {
            console.log(err);
            return err;
        })

        return user;
    }

    async signin(email, password, name) {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).then(async (newUser) => {
            await newUser.user.updateProfile({
                displayName: name
            });
            return newUser;
        }).catch(err => {
            console.log(err);
            return err;
        });

        return user;
    }

    async logout() {
        const logout = await firebase.auth().signOut().catch(err => {
            console.log(err);
            return err;
        });

        return logout;
    }

    async getUserState() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve);
        })
    }

    async getCurrentUser() {
        const user = await firebase.auth.getCurrentUser();
        return user;
    }
}

export default new Firebase();