import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, DateTime } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Product, Category } from '../products/products';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-category-modal',
  templateUrl: 'category-modal.html',
})
export class CategoryModalPage {
  category: Category = this.navParams.data;
  newCategory: boolean = false;
  categories: any;
  categoriesList: AngularFireList<any>;
  userId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public afDatabase: AngularFireDatabase,
    public storage: Storage,
    private toastCtrl: ToastController
  ) {
    if (!this.category) {
      this.category = new Category();
      this.newCategory = true;
    }

    storage.get('userId').then((returnedUserId) => {
      this.userId = returnedUserId;
      console.log('userId from categories.ts - ', this.userId);
      this.categoriesList = this.afDatabase.list('/categories/' + this.userId);
      this.categories = afDatabase.list('/categories/' + this.userId).valueChanges();
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  saveCategory() {
    var dateAdded: Date;
    if (!this.category.DateAdded) {
      dateAdded = new Date();
    } else {
      dateAdded = this.category.DateAdded;
    }

    const newOrderRef = this.categoriesList.push({});

    newOrderRef.set({
      //userId: this.userId,
      Id: newOrderRef.key,
      Sequence: this.category.Sequence,
      CategoryName: this.category.CategoryName,
      DateAdded: dateAdded,
      Active: this.category.Active,
      Colour: this.category.Colour,
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
