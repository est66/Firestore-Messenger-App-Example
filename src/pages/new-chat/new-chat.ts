import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';
import { Chat } from '../../Models/chat.model';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-new-chat',
  templateUrl: 'new-chat.html',
})
export class NewChatPage {

  name: string;
  uid: string;
  users: Observable<User[]>;
  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.users = afs.collection<User>('users').valueChanges();
  }
  close() {
    this.viewCtrl.dismiss();
  }

  async newChat(chatname, uid) {
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    var chatId = user.uid + Math.floor(Date.now());
    const data: any = {
      id: chatId,
      name: chatname,
      image: 'https://www.shareicon.net/data/128x128/2016/09/01/822762_user_512x512.png',
      createdAt: timestamp,
      users: {}
    }
    data.users[uid] = true;
    data.users[user.uid] = true;

    await db.collection("chats").doc(chatId).set(data)
      .then(function (docRef) {
        console.log("Document written with ID: ");

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    this.close();
  }

}
