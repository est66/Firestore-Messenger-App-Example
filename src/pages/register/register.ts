import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user.model';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  email: string;
  password: string;
  confirmPassword: String;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {
  }

  async register(email, password, confirmPassword) {

    if (password != confirmPassword) return alert("error password");
    const userResult = await this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(error.message);
    }).then(function (userResult) {

      var db = firebase.firestore();
      db.collection("users").doc(userResult.uid).set({
        uid: userResult.uid,
        email: userResult.email
      })
        .then(function () {
          console.log("User successfully added!");
        })
        .catch(function (error) {
          console.error("Error writing user: ", error);
        });
    });




  }


}
