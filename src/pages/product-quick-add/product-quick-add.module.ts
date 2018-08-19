import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductQuickAddPage } from './product-quick-add';

@NgModule({
  declarations: [
    ProductQuickAddPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductQuickAddPage),
  ],
})
export class ProductQuickAddPageModule {}
