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

  discount: any = this.navParams.data.Discount;

  discountType: string;
  discountAmount: number;

  firstInput: boolean = true;

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
    } else {
      if (!this.discountAmount) {
        this.discountAmount = 0;
      }
      if (!this.discountType) {
        this.discountType = 'percentage';
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
    if (this.discountAmount > 0) {
      var item = {
        discountType: this.discountType,
        discountAmount: this.discountAmount
      }
      this.viewCtrl.dismiss(item);
    } else {
      let toast = this.toastCtrl.create({
        message: 'Discount must be greater than 0',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    }
  }

  selectPercenatge() {
    this.discountType = 'percentage';
  }

  selectAmount() {
    this.discountType = 'amount';
  }

  addAmount(amount: string) {
    var newTotal: string;
    if (this.product) {
      if (this.product.Quantity > 0 && this.firstInput) {
        this.product.Quantity = Number(amount);
        this.firstInput = false;
      } else {
        newTotal = this.product.Quantity.toString() + amount;
        this.product.Quantity = Number(newTotal);
      }
    } else {
      if (this.discountAmount > 0 && this.firstInput) {
        this.discountAmount = Number(amount);
        this.firstInput = false;
      } else {
        newTotal = this.discountAmount.toString() + amount;
        this.discountAmount = Number(newTotal);
      }
    }
  }

  keypadBack() {
    var number: string;
    if (this.product) {
      number = this.product.Quantity.toString();
      number = number.substring(0, (number.length - 1));
      this.product.Quantity = Number(number);
    } else {
      number = this.discountAmount.toString();
      number = number.substring(0, (number.length - 1));
      this.discountAmount = Number(number);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdersKeypadModalPage');
  }

}
