import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ProductModalPage } from '../../pages/product-modal/product-modal';
import { CategoryModalPage } from '../../pages/category-modal/category-modal';
import { CategoryAddProductsModalPage } from '../../pages/category-add-products-modal/category-add-products-modal';

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
  Colour: string;
  TextColour: string;
  Unavailable?: boolean;
  Show?: boolean = true;
  length: number;
  Quantity?: number;
}

export class Category {
  Id: number;
  CategoryName: string;
  CategoryDescription: string;
  DateAdded: Date;
  Products: Product[];
  Sequence: number;
  Active: boolean;
  Colour: string;
  TextColour: string;
  Selected?: boolean = false;
}

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html'
})
export class ProductsPage {

  products: any;
  productsList: AngularFireList<any>;
  passedProductsList: any;
  categories: any;
  categoriesList: AngularFireList<any>;
  userId: any;
  showProducts: boolean = true;

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
      this.categoriesList = this.afDatabase.list('/categories/' + this.userId);
      this.categories = afDatabase.list('/categories/' + this.userId).valueChanges();
      console.log('prods list', this.productsList);
      console.log('avial', this.products);
    });
  }

  public openProductModal(product: Product) {
    let selectedProduct = product;
    var modalPage = this.modalCtrl.create(ProductModalPage, selectedProduct);
    modalPage.present();
  }

  public openCategoryModal(category: Category) {
    
    let selectedCategoryAndProducts = [category];
    var modalPage = this.modalCtrl.create(CategoryModalPage, selectedCategoryAndProducts);
    modalPage.present();
  }

  public openCategoryAddProductsModal(category: Category, products: Product[]) {

    // this.products.subscribe((_items) => {
    //   this.passedProductsList = [];
    //   _items.forEach(item => {
    //     this.passedProductsList.push(item);
    //   })
    // });

    let data = [category, products];
    var modalPage = this.modalCtrl.create(CategoryAddProductsModalPage, data);
    modalPage.present();
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

  addCategory() {
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
