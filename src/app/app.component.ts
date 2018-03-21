import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import * as firebase from 'firebase/app';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AngularFireAuth } from 'angularfire2/auth'
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public afAuth: AngularFireAuth) {

    // User is redirected to the right page depend of its situation
    let unsubscribe = this.afAuth.auth.onAuthStateChanged((user) => {
      // If there's no user logged in send him to the LoginPage
      if (user == null) this.rootPage = LoginPage;
      // Else go to HomePage
      else this.rootPage = HomePage;
    });




    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

