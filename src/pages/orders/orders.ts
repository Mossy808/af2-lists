import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, DateTime, ToastController, ModalController} from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { ItemSliding } from 'ionic-angular';

import { OrdersKeypadModalPage } from '../../pages/order-keypad/order-keypad';

import * as _ from 'underscore';
import {Product, Category} from '../products/products';

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
  templateUrl: 'orders.html'
})
export class OrdersPage {

  products: any;
  productsList: AngularFireList<any>;
  categories: any;
  categoriesList: AngularFireList<any>;
  orders: any;
  ordersList: AngularFireList<any>;
  currentOrderList: Order = new (Order);
  userId: any;
  //product: Product;
  selectedCategory: Category = new (Category);

  totalItems: number;
  totalPrice: number;
  objectKeys;

  productsSnapshot: any = [];
  orginialProductsSnapshot: any = [];

  categoriesSnapshotTop: any = [];
  categoriesSnapshotBottom: any = [];

  lastProductAdded: OrderProduct;

  discount: any;
  //orginialCategoriesSnapshot: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public afDatabase: AngularFireDatabase,
    public storage: Storage,
    private toastCtrl: ToastController,
    public modalCtrl: ModalController
  ) {
    storage.get('userId').then((returnedUserId) => {
      this.userId = returnedUserId;
      console.log('userId from Product.ts - ', this.userId);
      this.productsList = this.afDatabase.list('/products/' + this.userId);
      this.products = afDatabase.list('/products/' + this.userId).valueChanges();
      this.categoriesList = this.afDatabase.list('/categories/' + this.userId);
      this.categories = afDatabase.list('/categories/' + this.userId).valueChanges();
      this.ordersList = this.afDatabase.list('/orders/' + this.userId);
      this.orders = afDatabase.list('/orders/' + this.userId).valueChanges();
      this.snapshotProducts();
      this.snapshotCategories();
    });

    this.objectKeys = Object.keys;

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

  productPress(product: OrderProduct, item: ItemSliding) {
    console.log('long press product', product);

    let selectedProduct = [product];

    var modalPage = this.modalCtrl.create(OrdersKeypadModalPage, selectedProduct);
    modalPage.onDidDismiss(data => {
      product.Quantity = data.productQuantity;
      var index = _.findIndex(this.currentOrderList.Products, findProduct => findProduct.Id === product.Id);
      if (index >= 0) {
        this.currentOrderList.Products[index].Quantity = product.Quantity;
        if (item) {
          item.close();
        }
      } else {
        this.currentOrderList.Products.push(product);
        this.lastProductAdded = product;
        this.calculateTotalItems();
        this.calculateTotalPrice();
      }
    });
    modalPage.present();
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
    this.lastProductAdded = product;
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

    if (this.discount) {
      if (this.discount.discountType === 'percentage') {
        this.totalPrice -= (this.totalPrice * (this.discount.discountAmount / 100));
      } else {
        this.totalPrice -= this.discount.discountAmount;
      }
    }
  }

  completeOrder() {
    if (this.currentOrderList.Products.length) {
      const newOrderRef = this.ordersList.push({});

      newOrderRef.set({
        //userId: this.userId,
        id: newOrderRef.key,
        date: new Date(),
        products: this.currentOrderList.Products
      });

      this.currentOrderList.Products = new Array<OrderProduct>();
      this.calculateTotalItems();
      this.calculateTotalPrice();

      let toast = this.toastCtrl.create({
        message: 'Order completed Successfully',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    } else {
      let toast = this.toastCtrl.create({
        message: 'No Order to Save',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    }
  }

  addDiscount() {
    var modalPage = this.modalCtrl.create(OrdersKeypadModalPage);
    modalPage.onDidDismiss(data => {
      this.discount = data;
      this.calculateTotalPrice();
      console.log(data);
    });
    modalPage.present();
    // popup with keypad to add discount and bar at bottom of order list displaying discount
  }

  addRefund() {
    // popup with keypad to create refund
  }

  clearLast() {
    if (this.currentOrderList.Products.length) {

      this.currentOrderList.Products.forEach(product => {
        if (product.Id === this.lastProductAdded.Id) {
          var lastProductAddedId = this.lastProductAdded.Id;
          var index = _.findIndex(this.currentOrderList.Products, product => product.Id === lastProductAddedId);

          if (this.currentOrderList.Products[index].Quantity > 1) {

            this.currentOrderList.Products[index].Quantity--;

            let toast = this.toastCtrl.create({
              message: 'Last Quantity Cleared',
              duration: 3000,
              position: 'bottom'
            });

            toast.present();
          } else {

            this.currentOrderList.Products.splice(index, 1);
            this.lastProductAdded = this.currentOrderList.Products[this.currentOrderList.Products.length - 1];

            let toast = this.toastCtrl.create({
              message: 'Last Product Cleared',
              duration: 3000,
              position: 'bottom'
            });

            toast.present();
          }

        }
      });
      
    } else {
      let toast = this.toastCtrl.create({
        message: 'No Products on Order List',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
    }
  }

  removeItem(orderProductId: OrderProduct, item: ItemSliding) {
    var index = _.findIndex(this.currentOrderList.Products, product => product.Id === orderProductId);

    this.currentOrderList.Products.splice(index, 1);
  }

  addQuantity(orderProductId: OrderProduct) {
    var index = _.findIndex(this.currentOrderList.Products, product => product.Id === orderProductId);

    this.currentOrderList.Products[index].Quantity++;
  }

  snapshotCategories() {
    this.categories.forEach(category => {

      if (!this.categoriesSnapshotTop) {
        this.categoriesSnapshotTop = [];
      }

      if (!this.categoriesSnapshotBottom) {
        this.categoriesSnapshotBottom = [];
      }

      for (var i = 0; i < category.length; i++) {
        category[i].Selected = false;

        if (i % 2 === 0) {
          this.categoriesSnapshotTop.push(category[i]);
        } else {
          this.categoriesSnapshotBottom.push(category[i]);
        }
        
      }

      //this.orginialCategoriesSnapshot= this.categoriesSnapshot;
      //console.log(this.categoriesSnapshot);
    });

  };

  snapshotProducts() {
    this.products.forEach(product => {

      if (!this.productsSnapshot) {
        this.productsSnapshot = [];
      }
      for (var i = 0; i < product.length; i++) {
        product[i].Show = true;
        this.productsSnapshot.push(product[i]);
      }

      this.orginialProductsSnapshot = this.productsSnapshot;
      console.log(this.productsSnapshot);
    });
    
  };

  selectCategory(category: Category) {
    if (this.selectedCategory) {
      this.selectedCategory.Selected = false;
      if (category.Id === this.selectedCategory.Id) {
        this.selectedCategory = null;
      } else {
        this.selectedCategory = category;
      }
    } else {
      this.selectedCategory = category;
    }

    this.productsSnapshot = this.orginialProductsSnapshot;

    //this.productsSnapshot.filter(product => product.CategoryId === this.selectedCategory.Id);

    if (this.selectedCategory) {
      this.selectedCategory.Selected = true;
      var filteredList = this.productsSnapshot.filter((product: Product) => product.CategoryId === this.selectedCategory.Id);
      this.productsSnapshot = filteredList;
    }

    //this.productsSnapshot.forEach(product => {
    //  if (this.selectedCategory) {
    //    product.Show = false;
    //    if (product.CategoryId === this.selectedCategory.Id) {
    //      product.Show = true;
    //    }
    //  } else {
    //    product.Show = true;
    //  };
    //});
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
