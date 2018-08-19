import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryQuickAddPage } from './category-quick-add';

@NgModule({
  declarations: [
    CategoryQuickAddPage,
  ],
  imports: [
    IonicPageModule.forChild(CategoryQuickAddPage),
  ],
})
export class CategoryQuickAddPageModule {}
