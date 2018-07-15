import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NoteAddModalPage } from '../../pages/note-add-modal/note-add-modal';

/**
 * Generated class for the NotesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class Note {
  Id: number;
  User: string;
  Title: string;
  Note: string;
  ToDo: boolean = false;
  Important: boolean = false;
}

@IonicPage()
@Component({
  selector: 'page-notes',
  templateUrl: 'notes.html',
})
export class NotesPage {

  userId: any;
  notes: any;
  notesList: AngularFireList<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public afDatabase: AngularFireDatabase,
    public storage: Storage,
    public modalCtrl: ModalController
  ) {
    storage.get('userId').then((returnedUserId) => {
      this.userId = returnedUserId;
      this.notesList = this.afDatabase.list('/notes/' + this.userId);
      this.notes = afDatabase.list('/notes/' + this.userId).valueChanges();
    });
  }  

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotesPage');
  }

  public openAddNoteModal() {
    let newNote = new Note();
    var modalPage = this.modalCtrl.create(NoteAddModalPage, newNote);
    modalPage.present();
  }

}
