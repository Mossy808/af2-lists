import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, DateTime, ToastController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Storage } from '@ionic/storage';

import _ from 'underscore'

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class Order {
  Id: number;
  DateTime: DateTime;
  Products: OrderProduct[];
}

export class OrderProduct {
  Id: number;
  ProductCode: number;
  ProductName: string;
  Price: number;
  Quantity: number;
}

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  products: any;
  productsList: AngularFireList<any>;
  orders: any;
  ordersList: AngularFireList<any>;
  currentOrderList: Order = new (Order);
  userId: any;
  //product: Product;

  totalItems: number;
  totalPrice: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public afDatabase: AngularFireDatabase,
    public storage: Storage,
    private toastCtrl: ToastController
  ) {
    storage.get('userId').then((returnedUserId) => {
      this.userId = returnedUserId;
      console.log('userId from Product.ts - ', this.userId);
      this.productsList = this.afDatabase.list('/products/' + this.userId);
      this.products = afDatabase.list('/products/' + this.userId).valueChanges();
      this.ordersList = this.afDatabase.list('/orders/' + this.userId);
      this.orders = afDatabase.list('/orders/' + this.userId).valueChanges();
    });

    this.currentOrderList.Products = new Array<OrderProduct>();
  }

  addProduct() {
    let prompt = this.alertCtrl.create({
      title: 'Product Details',
      message: "Enter the deatils of the new product",
      inputs: [
        {
          name: 'ProductName',
          placeholder: 'Product Name'
        },
        {
          name: 'ProductCode',
          placeholder: 'Product Code'
        },
        {
          name: 'Price',
          placeholder: 'Price'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            const newProductRef = this.productsList.push({});

            newProductRef.set({
              userId: this.userId,
              id: newProductRef.key,
              productName: data.ProductName,
              productCode: data.ProductCode,
              price: data.Price
            });
          }
        }
      ]
    });
    prompt.present();
  }

  addToOrder(product: OrderProduct) {    
    if (this.currentOrderList.Products.length) {

      var existingOrderProduct = null;

      this.currentOrderList.Products.forEach (element => {
        if (element.Id === product.Id) {
          existingOrderProduct = element;
        }
      });

      if (!existingOrderProduct) {
        product.Quantity = 1;
        this.currentOrderList.Products.push(product);
      } else {
        this.currentOrderList.Products.forEach (element => {
          if (element.Id === product.Id) {
            element.Quantity += 1;
          }
        });
      }
    } else {
      product.Quantity = 1;
      this.currentOrderList.Products.push(product);
    }
    this.calculateTotalItems();
    this.calculateTotalPrice();
  }

  calculateTotalItems() {
    this.totalItems = 0;
      this.currentOrderList.Products.forEach (element => {
        this.totalItems += element.Quantity;
      });
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    this.currentOrderList.Products.forEach (element => {
      if (element.Price) {
        this.totalPrice += (element.Quantity * element.Price);
      }
    });
  }

  completeOrder() {
    const newOrderRef = this.ordersList.push({});

    newOrderRef.set({
      //userId: this.userId,
      id: newOrderRef.key,
      date: new Date(),
      products: this.currentOrderList.Products
    });

    this.currentOrderList.Products = new Array<OrderProduct>();

    let toast = this.toastCtrl.create({
      message: 'Order completed Successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }

  addDiscount() {
    
  }

  addRefund() {
    
  }

  clearLast() {

  }


  clearAll() {
    this.currentOrderList.Products = new Array<OrderProduct>();
    this.totalItems = 0;
    this.totalPrice = 0;

    let toast = this.toastCtrl.create({
      message: 'Order Cleared',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersPage');
  }

}
