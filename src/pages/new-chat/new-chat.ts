import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth'
import * as firebase from 'firebase/app';
import { Chat } from '../../Models/chat.model';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { FieldPath } from '@firebase/firestore-types';


@Component({
  selector: 'page-new-chat',
  templateUrl: 'new-chat.html',
})
export class NewChatPage {

  imageUrl: string;
  name: string;
  uid: string;
  email: string;
  selectUser: User;
  users: Observable<User[]>;
  nativepath: any;
  firestore = firebase.storage();
  imgsource: any;
  constructor(public fileSystem: File, public filePath: FilePath, public fileChooser: FileChooser, public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.users = afs.collection<User>('users').valueChanges();
    this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/firestore-messaging-app.appspot.com/o/images%2Fuser1.png?alt=media&token=1262d14a-4a8e-4d7b-95f3-efd9bebd6462";
  }
  close() {
    this.viewCtrl.dismiss();
  }

  async newChat(chatname, uid) {


    console.log(uid);

    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    var userId = user.uid;
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    var chatId = user.uid + Math.floor(Date.now());
    // await this.uploadimage();
    const data: any = {
      id: chatId,
      name: chatname,
      image: this.imageUrl,
      createdAt: timestamp,
      users: {}
    }
    data.users[uid] = true;
    data.users[user.uid] = true;
    //await this.fileUpload(file);
    await db.collection("chats").doc(chatId).set(data)
      .then(function (docRef) {
        console.log("Document written with ID: ");

      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });

    this.close();

  }


  //-----------------------CUSTOM STORAGE
  /*
  store() {

    this.fileChooser.open().then((url) => {
      this.filePath.resolveNativePath(url)
        .then(result => {
          this.nativepath = result;
          // this.uploadimage();
        }).catch(err => alert(err));
    })
  }
  
    async uploadimage() {
      this.fileSystem.resolveLocalFilesystemUrl(this.nativepath).then(res => {
          res.file((resFile) => {
            var reader = new FileReader();
            reader.readAsArrayBuffer(resFile);
            reader.onloadend = (evt: any) => {
              var imgBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
              var imageStore = this.firestore.ref().child('image');
              imageStore.put(imgBlob).then((res) => {
                alert('Upload Success');
                this.imageUrl = res.downloadURL;
              }).catch((err) => {
                alert('Upload Failed' + err);
              })
            }
          })
        })
}
*/
}
