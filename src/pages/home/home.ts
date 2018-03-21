import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatPage } from '../chat/chat'
import { Chat } from '../../models/chat.model';
//MY COMPONENT
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  chats: Observable<Chat[]>;


  constructor(public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore) {
    this.chats = afs.collection<Chat>('chats', ref => ref.where('users.PADsUB5BqCsbOuePlkmZ', '==', true)).valueChanges();
  }

  openChat(chat: Chat) {

    this.navCtrl.push(ChatPage, {
      chat: chat
    });

  }
}
