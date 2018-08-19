import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { AuthProvider } from '../providers/auth/auth';

import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { OrdersPage } from '../pages/orders/orders';
import { ProductsPage } from '../pages/products/products';
import { StockPage } from '../pages/stock/stock';
import { AuditPage } from '../pages/audit/audit';
import { NotesPage } from '../pages/notes/notes';
import { AboutPage } from '../pages/about/about';
import { SettingsPage } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  @ViewChild(AuthProvider) authProvider: AuthProvider;
  rootPage:any;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyBRaLZKmTlEeHVNzg2t_Bscg_jwx4-qIbo",
      authDomain: "epos-project-9eeb8.firebaseapp.com",
      databaseURL: "https://epos-project-9eeb8.firebaseio.com",
      projectId: "epos-project-9eeb8",
      storageBucket: "epos-project-9eeb8.appspot.com",
      messagingSenderId: "318890124720"
    });

    this.pages = [
      { title: 'Dashboard', component: DashboardPage },
      { title: 'Orders', component: OrdersPage },
      { title: 'Products', component: ProductsPage },
      { title: 'Stock', component: StockPage },
      { title: 'Audit', component: AuditPage },
      { title: 'Notes', component: NotesPage },
      { title: 'About', component: AboutPage },
      { title: 'Settings', component: SettingsPage },
      { title: 'Logout', component: LoginPage }
    ];

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        this.rootPage = LoginPage;
        unsubscribe();
      } else {
        this.rootPage = DashboardPage;
        unsubscribe();
      }
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.authProvider.logoutUser()
    .then( authData => {
        this.nav.setRoot(LoginPage);
      });
  }
}

