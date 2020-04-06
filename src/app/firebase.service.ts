import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { UsersService } from './users.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public user: UsersService, public afstore: AngularFirestore) { }

  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res =>{ 
          if (res.user){
            this.afstore.doc(`users/${res.user.uid}`).set({
              email: res.user.email
            })
            this.user.setUser({
              email: res.user.email, 
              uid: res.user.uid
            });
          }
          resolve(res)
        },
        err => reject(err))
    })
   }
  
   loginUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(
        res =>{ 
          if (res.user){
            this.user.setUser({
              email: res.user.email, 
              uid: res.user.uid
            });
          }
          resolve(res)
        },
        err => reject(err))
    })
   }
  
   logoutUser(){
     return new Promise((resolve, reject) => {
       if(firebase.auth().currentUser){
         firebase.auth().signOut()
         .then(() => {
           console.log("LOG Out");
           resolve();
         }).catch((error) => {
           reject();
         });
       }
     })
   }
 
}
