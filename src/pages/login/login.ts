import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../models/user.model';
import { RegisterPage } from '../../pages/register/register';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  email: string;
  password: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth) {

  }

  login(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }
}
