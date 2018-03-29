import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, PopoverController } from 'ionic-angular';


import { Chat } from '../../models/chat.model';
import { Message } from '../../models/message.model';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;
  messages: Observable<Message[]>;
  message: string;
  private messagesCollection: AngularFirestoreCollection<Message>;
  chat: Chat;
  currentUser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private afs: AngularFirestore, public popoverCtrl: PopoverController) {
    this.currentUser = firebase.auth().currentUser;
    this.chat = navParams.get('chat');
    try {
      this.messages = afs.collection<Message>('messages', ref => ref.where('chatId', '==', this.chat.id).orderBy("createdAt", "asc")).valueChanges();
    } catch (error) {
      console.log('no message in chat');
    }
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


  async sendMessage(message: string) {
    if (message == undefined || message.length < 1) return console.log("no message to send");
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    var userEmail = user.email;
    var storage = firebase.storage();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    await db.collection("messages").add({
      chatId: this.chat.id,
      content: message,
      email: userEmail,
      uid: userId,
      createdAt: timestamp
    })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        this.message = "";
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    this.message = "";
  }
}
