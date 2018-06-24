import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
  template: `
      <ion-list>
        <ion-list-header>Options</ion-list-header>
        <button ion-item (click)="close()">Accessability</button>
        <button ion-item (click)="close()">Translations</button>              
      </ion-list>
      <span (click)="close()">Username</span><br />  
      <span (click)="close()">Version 0.0.1</span>
    `
})
export class PopoverPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  close() {
    this.viewCtrl.dismiss();
  }

}