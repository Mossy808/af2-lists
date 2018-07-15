import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryAddProductsModalPage } from './category-add-products-modal';

@NgModule({
  declarations: [
    CategoryAddProductsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryAddProductsModalPage),
  ],
})
export class CategoryAddProductsModalPageModule {}
