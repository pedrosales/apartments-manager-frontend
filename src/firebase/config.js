import firebase from 'firebase/app';
import 'firebase/auth';


const config = {

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