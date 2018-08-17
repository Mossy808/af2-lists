import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { OrderProduct } from '../orders/orders';

/**
 * Generated class for the OrderKeypadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order-keypad',
  templateUrl: 'order-keypad.html'
})
export class OrdersKeypadModalPage {

  product: OrderProduct = this.navParams.data[0];

  discountType: string;
  discountAmount: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toastCtrl: ToastController
  ) {
    console.log(this.product);
    if (this.product) {
      if (!this.product.Quantity) {
        this.product.Quantity = 0;
      }
    }
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  addAmendProduct() {
    if (this.product.Quantity) {
      var item = {
        productQuantity: this.product.Quantity
      }
      this.viewCtrl.dismiss(item);
    } else {
      let toast = this.toastCtrl.create({
        message: 'Quantity must be greater than 0',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    }
  }

  applyDiscount() {
    var item = {
      discountType: this.discountType,
      discountAmount: this.discountAmount
  }
    this.viewCtrl.dismiss(item);
  }

  selectPercenatge() {
    this.discountType = 'percentage';
  }

  selectAmount() {
    this.discountType = 'amount';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersKeypadModalPage');
  }

}
