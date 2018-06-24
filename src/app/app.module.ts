import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

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

import { PopoverPage } from '../pages/popover/popover';

// Import the AF2 Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AuthProvider } from '../providers/auth/auth';

// AF2 Settings
export const firebaseConfig = {
  apiKey: "AIzaSyDnerRdd14a5oJ_DJ1XsodL897SHnhv6Ec",
  authDomain: "ouproject-69319.firebaseapp.com",
  databaseURL: "https://ouproject-69319.firebaseio.com",
  projectId: "ouproject-69319",
  storageBucket: "ouproject-69319.appspot.com",
  messagingSenderId: "988473869022"
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
    CategoryModalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot()
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
    CategoryModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider
  ]
})
export class AppModule {}
