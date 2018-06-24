import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, DateTime } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product } from '../products/products';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProductModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-modal',
  templateUrl: 'product-modal.html',
})
export class ProductModalPage {
  product: Product = this.navParams.data;
  newProduct: boolean = false;
  products: any;
  productsList: AngularFireList<any>;
  userId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public afDatabase: AngularFireDatabase,
    public storage: Storage,
    private toastCtrl: ToastController
  ) {
    if (!this.product) {
      this.product = new Product();
      this.newProduct = true;
    }

    storage.get('userId').then((returnedUserId) => {
      this.userId = returnedUserId;
      console.log('userId from Product.ts - ', this.userId);
      this.productsList = this.afDatabase.list('/products/' + this.userId);
      this.products = afDatabase.list('/products/' + this.userId).valueChanges();
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  saveProduct() {
    var dateAdded: Date;
    if (!this.product.DateAdded) {
      dateAdded = new Date();
    } else {
      dateAdded = this.product.DateAdded;
    }

    const newOrderRef = this.productsList.push({});

    newOrderRef.set({
      //userId: this.userId,
      Id: newOrderRef.key,
      Sequence: this.product.Sequence,
      ProductCode: this.product.ProductCode,
      ProductName: this.product.ProductName,
      ProductDescription: this.product.ProductDescription,
      DateAdded: dateAdded,
      Active: true,
      Colour: 'red',
    });

    let toast = this.toastCtrl.create({
      message: 'Product Added Successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductModalPage');
  }

}
