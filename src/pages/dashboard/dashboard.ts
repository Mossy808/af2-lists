import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController } from 'ionic-angular';

import { OrdersPage } from '../../pages/orders/orders';
import { StockPage } from '../../pages/stock/stock';
import { AuditPage } from '../../pages/audit/audit';
import { HistoryPage } from '../../pages/history/history';
import { NotesPage } from '../../pages/notes/notes';
import { UploadPage } from '../../pages/upload/upload';
import { AboutPage } from '../../pages/about/about';
import { SettingsPage } from '../../pages/settings/settings';

import { PopoverPage } from '../../pages/popover/popover';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})

export class DashboardPage {

  ordersPage: any;
  stockPage: any;
  auditPage: any;
  historyPage: any;
  notesPage: any;
  uploadPage: any;
  aboutPage: any;
  settingsPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public popoverCtrl: PopoverController
  ) {
    this.ordersPage = OrdersPage;
    this.stockPage = StockPage;
    this.auditPage = AuditPage;
    this.historyPage = HistoryPage;
    this.notesPage = NotesPage;
    this.uploadPage = UploadPage;
    this.aboutPage = AboutPage;
    this.settingsPage = SettingsPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.setRoot(page);
  }

}