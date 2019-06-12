import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase/app';
import {AngularFirestore} from '@angular/fire/firestore';


@Injectable({
    providedIn: 'root'
})
export class FirebaseService {

    constructor(private fAuth: AngularFireAuth, private afs: AngularFirestore) {
    }

    login = async (email, password) => {
        try {
            return await this.fAuth.auth.signInWithEmailAndPassword(email, password);
        } catch (e) {
            return e;
        }
    };

    logout = async () => {
        try {
            return await this.fAuth.auth.signOut();
        } catch (e) {
            return e;
        }
    };

    getHome = () => {
        return this.afs.collection('home');
    };

    getProperties = () => {
        return this.afs.collection('properties');
    };

    getCollection = () => {
        return this.afs;
    };
}
