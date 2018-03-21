import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content } from 'ionic-angular';


import { Chat } from '../../models/chat.model';
import { Message } from '../../models/message.model';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  messages: Observable<Message[]>;
  private messagesCollection: AngularFirestoreCollection<Message>;
  chat: Chat;


  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore) {
    this.chat = navParams.get('chat');
    this.messages = afs.collection<Message>('messages', ref => ref.where('chatId', '==', this.chat.id).orderBy("createdAt", "asc")).valueChanges();
  }
  //scrolls to bottom whenever the page has loaded
  ionViewWillEnter(): void {
    this.scrollToBottom();
  }
  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }

}
