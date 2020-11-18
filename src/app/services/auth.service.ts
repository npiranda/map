import { Injectable } from '@angular/core';
import firebase from 'firebase';
import {error} from '@angular/compiler/src/util';
import OAuthCredential = firebase.auth.OAuthCredential;

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class AuthService {
  user: string;

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  signInGoogle(){
    return new Promise(
      ((resolve, reject) => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(
          (result) => {
            this.user = result.user['displayName'];
            console.log(this.user);
            resolve(this.user);
          },
          (error) => {
            reject(error);
          }
        );
      })
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }
}
