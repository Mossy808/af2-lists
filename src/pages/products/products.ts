import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductModalPage } from '../../pages/product-modal/product-modal';
import { CategoryModalPage } from '../../pages/category-modal/category-modal';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export class Product {
  Id: number;
  ProductCode: number;
  ProductName: string;
  ProductDescription: string;
  Price: number;
  DateAdded: Date;
  CategoryId: number;
  Sequence: number;
  Active: boolean;
  Color: string;
 }

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {

  products: any;
  productsList: AngularFireList<any>;
  userId: any;
  showProducts: boolean = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public afDatabase: AngularFireDatabase,
    public storage: Storage,
    public modalCtrl : ModalController
  ) {
    storage.get('userId').then((returnedUserId) => {
      this.userId = returnedUserId;
      console.log('userId from Product.ts - ', this.userId);
      this.productsList = this.afDatabase.list('/products/' + this.userId);
      this.products = afDatabase.list('/products/' + this.userId).valueChanges();
    });
    
  }

  public openProductModal(product: Product){
    let selectedProduct = product;
    var modalPage = this.modalCtrl.create(ProductModalPage, selectedProduct);
    modalPage.present();
  }

  public openCategoryModal(){
    var modalPage = this.modalCtrl.create(CategoryModalPage);
    modalPage.present();
  }  

  addProduct(){
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

  addCategory(){
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }

}
