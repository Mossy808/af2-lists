import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IonicPage, NavController, NavParams, AlertController, ModalController, ViewController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Note } from '../notes/notes';

/**
 * Generated class for the NoteAddModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-note-add-modal',
  templateUrl: 'note-add-modal.html',
})
export class NoteAddModalPage {

  userId: any;
  note: Note = this.navParams.data;
  notes: any;
  notesList: AngularFireList<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public afDatabase: AngularFireDatabase,
    public viewCtrl: ViewController,
    public storage: Storage,
    public modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    storage.get('userId').then((returnedUserId) => {
      this.userId = returnedUserId;
      this.notesList = this.afDatabase.list('/notes/' + this.userId);
      this.notes = afDatabase.list('/notes/' + this.userId).valueChanges();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NoteAddModalPage');
  }

  saveNote() {
    const userId = this.userId;
    const note = this.note;
    const newNoteRef = this.notesList.push({});

    newNoteRef.set({
      UserId: this.userId,
      Id: newNoteRef.key,
      User: this.note.User,
      Title: this.note.Title,
      Note: this.note.Note,
      ToDo: this.note.ToDo,
      Important: this.note.Important
    });

    let toast = this.toastCtrl.create({
      message: 'Note Added Successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
    this.viewCtrl.dismiss();
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
