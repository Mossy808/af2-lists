import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, DateTime } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product, Category } from '../products/products';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the CategoryAddProductsModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category-add-products-modal',
  templateUrl: 'category-add-products-modal.html',
})
export class CategoryAddProductsModalPage {
  category: Category = this.navParams.data[0];
  categories: any;
  categoriesList: AngularFireList<any>;
  userId: any;
  availableProducts: any;
  availableProductList: Product[];
  //addedProducts: Product[] = new Array<Product>();
  products: any;
  productsList: AngularFireList<any>;
  albums: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public afDatabase: AngularFireDatabase,
    public storage: Storage,
    private toastCtrl: ToastController
  ) {
    storage.get('userId').then((returnedUserId) => {
      this.userId = returnedUserId;
      console.log('userId from categories.ts - ', this.userId);
      this.categoriesList = this.afDatabase.list('/categories/' + this.userId);
      this.categories = afDatabase.list('/categories/' + this.userId).valueChanges();
      this.availableProducts = afDatabase.list('/products/' + this.userId).valueChanges();
      this.productsList = this.afDatabase.list('/products/' + this.userId);
      this.products = afDatabase.list('/products/' + this.userId).valueChanges();
      this.albums = afDatabase.list('/products/' + this.userId);
      console.log('catlist', this.categoriesList);
      console.log('cats', this.categories);
      console.log('avial prods', this.availableProducts);
      console.log('prods list', this.productsList);
      console.log('avial', this.products);
      console.log('category', this.category);

      this.filterAvailableList();


      this.products.subscribe((_items) => {
        this.availableProductList = [];
        _items.forEach(item => {
          this.availableProductList.push(item);
        });
      });

      this.availableProductList.forEach(availableProduct => {
        this.category.Products.forEach(addedProduct => {
          if (availableProduct.Id === addedProduct.Id) {
            this.availableProducts.splice(this.availableProducts.indexOf(addedProduct), 1);
          }
        });
      });

      console.log('LOOK HERE AHHHHHHHHHHH', this.availableProducts);
    });
  }

  filterAvailableList() {

  }

  addProductToCategory(product: Product) {
    var alreadyAdded = false;
    //this.category.Products.forEach(addedProduct => {
    //  if (product.Id === addedProduct.Id) {
    //    alreadyAdded = true;
    //  }
    //});

    if (!alreadyAdded) {
      if (!this.category.Products) {
        this.category.Products = new Array<Product>();
      }
      this.category.Products.push(product);
    } else {
      let toast = this.toastCtrl.create({
        message: 'Product Added Exists in Category',
        duration: 3000,
        position: 'bottom'
      });
    }
  }

  removeProductFromCategory(product: Product) {
    this.category.Products.splice(this.category.Products.indexOf(product), 1);
    //this.category.Products.push(product);
  }

  saveCategoryProducts() {
    const userId = this.userId;
    const categoryId = this.category.Id;
    this.afDatabase.database.ref(`categories/${userId}/${categoryId}`).update(
      {
        Products: this.category.Products
      }).then(res => {
      console.log(res);
      });

    this.category.Products.forEach(addedProduct => {
      this.afDatabase.database.ref(`products/${userId}/` + addedProduct.Id).update(
        {CategoryId: this.category.Id});
    });

    //const newCategoryRef = this.categoriesList.push({});

    //newCategoryRef.update(this.category.Id, {
    //  Products: this.addedProducts
    //});

    let toast = this.toastCtrl.create({
      message: 'Product Added Successfully',
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryAddProductsModalPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
}
