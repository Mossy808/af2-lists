import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { ColorPickerModule } from 'ngx-color-picker';
import { MomentModule } from 'angular2-moment';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { HomePage } from '../pages/home/home';
import { OrdersPage } from '../pages/orders/orders';
import { StockPage } from '../pages/stock/stock';
import { AuditPage } from '../pages/audit/audit';
import { HistoryPage } from '../pages/history/history';
import { NotesPage } from '../pages/notes/notes';
import { UploadPage } from '../pages/upload/upload';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';
import { ProductsPage } from '../pages/products/products';

import { ProductModalPage } from '../pages/product-modal/product-modal';
import { CategoryModalPage } from '../pages/category-modal/category-modal';
import { CategoryAddProductsModalPage } from '../pages/category-add-products-modal/category-add-products-modal';
import { NoteAddModalPage } from '../pages/note-add-modal/note-add-modal';
import { OrdersKeypadModalPage } from '../pages/order-keypad/order-keypad';

import { PopoverPage } from '../pages/popover/popover';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyBRaLZKmTlEeHVNzg2t_Bscg_jwx4-qIbo",
  authDomain: "epos-project-9eeb8.firebaseapp.com",
  databaseURL: "https://epos-project-9eeb8.firebaseio.com",
  projectId: "epos-project-9eeb8",
  storageBucket: "epos-project-9eeb8.appspot.com",
  messagingSenderId: "318890124720"
};

AngularFireModule.initializeApp(firebaseConfig)

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    DashboardPage,
    HomePage,
    OrdersPage,
    StockPage,
    AuditPage,
    HistoryPage,
    NotesPage,
    UploadPage,
    AboutPage,
    SettingsPage,
    ProductsPage,
    PopoverPage,
    ProductModalPage,
    CategoryModalPage,
    CategoryAddProductsModalPage,
    NoteAddModalPage,
    OrdersKeypadModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    ColorPickerModule,
    MomentModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    ResetPasswordPage,
    HomePage,
    DashboardPage,
    OrdersPage,
    StockPage,
    AuditPage,
    HistoryPage,
    NotesPage,
    UploadPage,
    AboutPage,
    SettingsPage,
    ProductsPage,
    PopoverPage,
    ProductModalPage,
    CategoryModalPage,
    CategoryAddProductsModalPage,
    NoteAddModalPage,
    OrdersKeypadModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    BarcodeScanner
  ]
})
export class AppModule {}
