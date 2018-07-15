import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {
  constructor(
    public storage: Storage
  ) {}

  loginUser(email: string, password: string): Promise<any> {
    return firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
      this.storage.set('userId', result.user.uid);
      this.storage.set('email', result.user.email);
      console.log('result', result);
    });
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then( newUser => {
        firebase
        .database()
        .ref('/userProfile')
        .child(newUser.user.uid)
        .set({ email: email });
      });
  }

  resetPassword(email: string): Promise<void> {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    this.storage.remove('userId');
    this.storage.remove('email');
    return firebase.auth().signOut();
  }
}