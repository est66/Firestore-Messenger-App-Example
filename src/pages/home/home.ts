import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { ChatPage } from '../chat/chat'
import { Chat } from '../../models/chat.model';
//MY COMPONENT
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth'
import { Observable } from 'rxjs/Observable';
import { LoginPage } from '../login/login';
import { NewChatPage } from '../new-chat/new-chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  chats: Observable<Chat[]>;


  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    let unsubscribe = this.afAuth.auth.onAuthStateChanged((user) => {
      // If there's no user logged in send him to the LoginPage
      if (user == null) this.navCtrl.push(LoginPage);
      // Else go to HomePage
      else this.chats = afs.collection<Chat>('chats', ref => ref.where(`users.${user.uid}`, '==', true)).valueChanges();
    });
  }
  openChat(chat: Chat) {
    this.navCtrl.push(ChatPage, {
      chat: chat
    });

  }

  logout() {
    this.afAuth.auth.signOut();
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(NewChatPage);
    popover.present();
  }
}
