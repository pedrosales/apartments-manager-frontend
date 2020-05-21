import firebase from 'firebase/app';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyCJ_ph5UUwkDxdBhEOZ_v7rXobZdkUc4OA",
    authDomain: "kipler-apartments-manager.firebaseapp.com",
    databaseURL: "https://kipler-apartments-manager.firebaseio.com",
    projectId: "kipler-apartments-manager",
    storageBucket: "kipler-apartments-manager.appspot.com",
    messagingSenderId: "809667579012",
    appId: "1:809667579012:web:c018954debefafd99906d1"
}

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

    async signin(email, password) {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
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
}

export default new Firebase();