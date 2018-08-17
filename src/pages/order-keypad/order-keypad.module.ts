import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersKeypadModalPage } from './order-keypad';

@NgModule({
  declarations: [
    OrdersKeypadModalPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersKeypadModalPage)
  ]
})
export class OrderKeypadPageModule {}
