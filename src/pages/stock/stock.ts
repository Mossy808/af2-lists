import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Product } from '../products/products'
/**
 * Generated class for the StockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
})
export class StockPage {

  userId: any;
  products: any;
  productsList: AngularFireList<any>;
  stock: any;
  stockList: AngularFireList<any>;
  date: Date = new Date();

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

      console.log('userId from Product.ts - ', this.userId);

      this.productsList = this.afDatabase.list('/products/' + this.userId);
      this.products = afDatabase.list('/products/' + this.userId).valueChanges();

      this.stockList = this.afDatabase.list('/stock/' + this.userId + '/' + this.date);
      this.stock = afDatabase.list('/stock/' + this.userId + '/' + this.date).valueChanges();

      console.log('prods list', this.productsList);
      console.log('avial', this.products);
    });
  }

  saveStock() {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockPage');
  }

}
