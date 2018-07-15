import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AuditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-audit',
  templateUrl: 'audit.html'
})
export class AuditPage {

  userId: any;

  audits: any;
  auditsList: AngularFireList<any>;

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
      this.auditsList = this.afDatabase.list('/audits/' + this.userId);
      this.audits = afDatabase.list('/audits/' + this.userId).valueChanges();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuditPage');
  }

}
